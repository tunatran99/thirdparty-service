import { Inject, Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { PriceEntity } from '../infratsructure/entity/price';
import moment from 'moment';
import { SkuEntity } from '../infratsructure/entity/sku';
import { readConnection } from '@libs/database.module';
import { PriceServiceRepositoryImplement } from '../infratsructure/repository/price.service.repository.implement';
import { Environment, environment } from 'src/environment';
import got from 'got';

@Injectable()
export class PriceService {
  private readonly logger = new Logger(PriceService.name);

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  async callMobileApp(prices: PriceEntity[]) {
    if (environment.NODE_ENV === Environment.Production) {
      const donwloadMobileLink = environment.MBAPP_HOST;
      const donwloadMobileKEY = environment.MBAPP_APIKEY;
      const { success } = this.formatDataForMBApp(prices);
      const chunks = _.chunk(success, environment.API_CHUNK_SIZE);
      for (const [index, chunk] of chunks.entries()) {
        this.logger.log(`Calling: ${donwloadMobileLink} | ${index + 1}/${chunks.length} chunks`);
        const res = (await got
          .post(`${donwloadMobileLink}/api/downloadprice`, {
            headers: {
              'x-api-key': donwloadMobileKEY,
            },
            json: chunk,
          })
          .json()) as any;

        if (res.data?.error && res.data.error.length > 0) {
          this.logger.log(res.data.error);
        }

        this.logger.log('---------');
      }
    } else {
      return prices;
    }
  }

  formatDataForMBApp(prices: PriceEntity[], skusNotFound: string[] = []) {
    const success = [],
      error = [];
    for (const sku of skusNotFound) {
      error.push({
        sku_code: sku,
        store_code: null,
        code: '001',
        message: 'SKU not found',
      });
    }
    for (const ps of prices) {
      let startTime = null,
        endTime = null;
      if (ps.startTime) {
        startTime = `${moment(ps.startTime).subtract(1, 'day').format('YYYYMMDD')} 18:01:00`;
      }
      if (ps.endTime) {
        endTime = `${moment(ps.endTime).format('YYYYMMDD')} 18:00:00`;
      }
      const priceData = {
        store_code: ps.store,
        normal_price: ps.normalPrice,
        promotion_price: ps.promoPrice || null,
        price_start_time: startTime,
        price_end_time: endTime,
      };
      const existItem = success.find((i) => i.sku_code === ps.sku);
      if (!existItem) {
        success.push({
          sku_code: ps.sku,
          sku_status: ps.status,
          uom: ps.uomVn,
          apply_store: [priceData],
        });
      } else {
        existItem.apply_store.push(priceData);
      }
    }
    return { success, error };
  }

  async calcPrice(skusParam?: string[], priceDate?: string) {
    let eligibleStore = ["1001", "1002", "1003", "1004", "1005", "1006", "1008", "1009"]
    this.logger.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Bắt đầu tính giá`);

    //Chuẩn bị các config params
    let now = moment();
    if (priceDate) {
      now = moment(priceDate, 'YYYYMMDD');
    }
    const currDate = now.format('YYYYMMDD');
    // const currDate = '20221230';
    const isBefore18h = moment().isBefore(now.hour(18));
    // const isBefore18h = true;
    const is04or19 = now.format('DD') === '04' || now.format('DD') === '19';
    const is05or20 = now.format('DD') === '05' || now.format('DD') === '20';
    const isActiveMemberDay = (is04or19 && !isBefore18h) || (is05or20 && isBefore18h);

    //Bảng chuyển đổi uom
    const masterUom = await this.priceServiceRepo.findUom();

    //Lấy tất cả store
    const allStores = (await this.priceServiceRepo.findStore()).map(s => s.STORE_ID);

    //Mảng kết quả giá toàn bộ
    const psPrices: PriceEntity[] = [];
    const errors = [] as { sku: SkuEntity; error: string }[];

    //Nếu không truyền skus thì lấy toàn bộ
    if (!skusParam) {
      const allSkus = await this.priceServiceRepo.findAndCountSku();
      skusParam = allSkus.map((i) => i.SKU_CODE);
    }

    //Duyệt 100 skus 1 lần
    const skuChunks = _.chunk(skusParam, 100);
    for (const [chunkIndex, skuChunk] of skuChunks.entries()) {
      this.logger.log(
        `${moment().format('DD/MM/YYYY HH:mm:ss')} - Tính giá chunk ${chunkIndex + 1}/${skuChunks.length}`,
      );

      //Truy vấn data liên quan
      const skuSql = this.priceServiceRepo.findAndCountSku(skuChunk);
      const ispSql = this.priceServiceRepo.findIspBySkus(skuChunk);
      const pcSql = this.priceServiceRepo.findPcBySkus(skuChunk);
      const [skus, isps, pcs] = await Promise.all([skuSql, ispSql, pcSql]);

      if (skus.length === 0) continue;

      //Ghép các data đã truy vấn
      for (const sku of skus) {
        // if(sku.ITEM_SELL_PRICE) console.log(sku.ITEM_SELL_PRICE)
        sku.itemSellPrices = [];
        sku.pricechanges = [];
        for (const ispItem of isps) {
          if (sku.SKU_CODE === ispItem.SKU) {
            sku.itemSellPrices = [...sku.itemSellPrices, ispItem];
          }
        }
        for (const pcItem of pcs) {
          if (sku.SKU_CODE === pcItem.SKU) {
            sku.pricechanges = [...sku.pricechanges, pcItem];
          }
        }
      }

      //Lấy mảng unique các categories và grouppricechange của nó
      const skuCategories = _.uniq(skus.map((i) => i.CATEGORY_ID));
      const rawGPC = await this.priceServiceRepo.findGpcByCategories(skuCategories);

      //Mảng grouppricechange
      //Lọc bỏ các record có enddate < ngày hiện tại (hết hạn áp dụng)
      //Sắp xếp lại list theo thứ tự giảm dần theo PC_NO và startdate (mới nhất trước)
      const grouppricechanges = _.orderBy(
        rawGPC.filter((i) => {
          if (i.END_DATE && Number.parseInt(i.END_DATE) < Number.parseInt(currDate)) {
            return false;
          }
          return i;
        }),
        [(item) => Number.parseInt(item.PRICE_CHANGE_NO), (item) => Number.parseInt(item.START_DATE)],
        ['desc', 'desc'],
      );
      //Lấy từng sku
      for (const [, sku] of skus.entries()) {
        //Nếu không có pricechange và items_sell_prices thì bỏ qua (thiếu data giá)
        // if (sku.itemSellPrices.length === 0 && sku.pricechanges.length === 0) {
        //   errors.push({
        //     sku,
        //     error: 'Không có data giá ở cả Pricechange và Items_sell_prices',
        //   });
        //   continue;
        // }

        //Lấy mảng unique các store của sku
        const ispStores = _.uniq(sku.itemSellPrices.map((i) => i.STORE));
        const pcStores = _.uniq(sku.pricechanges.map((i) => i.STORE));
        sku.stores = _.uniq([...ispStores, ...pcStores]);

        //Lấy mảng store không có trong item_sell_prices và pricechange
        const remainStores = allStores.filter(s => !sku.stores.includes(s))

        //Tính STATUS của sku
        sku.STATUS = '0';
        if (sku.ACTIVED === 'Y') {
          if (sku.DELETED === 'N') {
            sku.STATUS = '1';
          }
        }

        //Chuyển đổi uom vn sang mã code (code từ mobile app)
        let uomVn = null;
        if (sku.POP3_DESC_VNM) {
          const uom = masterUom.find((i) => i.name.trim().toLowerCase() === sku.POP3_DESC_VNM.trim().toLowerCase());
          if (uom) {
            uomVn = uom.code;
          }
        }

        //Sắp xếp mới items_sell_prices (mới nhất trước)
        const itemsellprices = _.orderBy(sku.itemSellPrices, 'ITEMSELLPRICE_CODE', 'desc');

        //Mảng pricechanges
        //Lọc bỏ các record có enddate > ngày hiện tại (hết hạn áp dụng)
        //Lọc bỏ TRANS_TYPE = PDCM hoặc PMOM
        //Sắp xếp lại list theo thứ tự giảm dần theo PC_NO và startdate (mới nhất trước)
        const pricechanges = _.orderBy(
          sku.pricechanges.filter((i) => {
            if (i.END_DATE && Number.parseInt(i.END_DATE) < Number.parseInt(currDate)) {
              return false;
            }
            if (['PDCM', 'PMOM'].includes(i.TRANS_TYPE)) {
              return false;
            }
            return i;
          }),
          [(item) => Number.parseInt(item.PRICE_CHANGE_NO), (item) => Number.parseInt(item.START_DATE)],
          ['desc', 'desc'],
        );

        // if (sku.stores.length !== 0) {
        //Lấy từng store của sku
        for (const store of sku.stores) {
          // if (eligibleStore.includes(store)) {
            //Tạo record giá
            const psPrice = readConnection.getRepository(PriceEntity).create({
              sku: sku.SKU_CODE,
              store,
              line: sku.LINE_ID,
              division: sku.DIVISION_ID,
              group: sku.GROUP_ID,
              dept: sku.DEPT_ID,
              category: sku.CATEGORY_ID,
              status: sku.STATUS,
              member: sku.MEMBER_DISC_ITEM,
              uomEn: sku.RETAIL_UOM,
              uomVn: uomVn,
            });

            //Lọc chỉ lấy các pricechanges của store
            const filteredPc = pricechanges.filter((i) => i.STORE === psPrice.store);

            //Nếu trước 18h -> lấy pc mới nhất có ngày áp dụng nhỏ hơn hoặc bằng ngày hiện tại
            //Nếu sau 18h -> lấy pc mới nhất có ngày áp dụng nhỏ hơn hoặc bằng ngày mai
            let pc = filteredPc.find((i) => Number.parseInt(i.START_DATE) <= Number.parseInt(currDate));
            if (!isBefore18h) {
              const tomorrow = moment(currDate, 'YYYYMMDD').add(1, 'day').format('YYYYMMDD');
              const tomorrowPC = filteredPc.find((i) => i.START_DATE === tomorrow);
              if (tomorrowPC) pc = tomorrowPC;
            }

            //Nếu có pricechange
            if (pc) {
              if ('EOP' === pc.TRANS_TYPE) {
                const promoPc = filteredPc.find(
                  (i) =>
                    i.PRICE_ID !== pc.PRICE_ID &&
                    Number.parseInt(i.START_DATE) <= Number.parseInt(currDate) &&
                    ['PDC'].includes(i.TRANS_TYPE),
                );
                if (promoPc) {
                  psPrice.pcNo = promoPc.PRICE_CHANGE_NO;
                  psPrice.pcStatus = promoPc.STATUS;
                  psPrice.pcTransType = promoPc.TRANS_TYPE;
                  psPrice.pcType = promoPc.PRICE_CHANGE_TYPE;
                  psPrice.pcTypeValue = promoPc.PRICE_CHANGE_TYPE_VALUE;
                  psPrice.pcNormalPrice = promoPc.LAST_SELL_PRICE;
                  psPrice.pcPrice = promoPc.NEW_SELL_PRICE;
                  psPrice.pcStartDate = promoPc.START_DATE;
                  psPrice.pcEndDate = promoPc.END_DATE;
                  psPrice.pcStartTime = promoPc.DAILY_START_TIME;
                  psPrice.pcEndTime = promoPc.DAILY_END_TIME;
                  psPrice.priceFrom = 'pricechange';

                  psPrice.normalPrice = promoPc.LAST_SELL_PRICE ?? "0";
                  psPrice.promoPrice = promoPc.NEW_SELL_PRICE;
                  psPrice.startTime = promoPc.START_DATE
                    ? moment(`${promoPc.START_DATE}-${promoPc.DAILY_START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                    : null;
                  psPrice.endTime = promoPc.END_DATE
                    ? moment(`${promoPc.END_DATE}-${promoPc.DAILY_END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                    : null;
                } else {
                  const notEOP = filteredPc.find(
                    (k) =>
                      k.PRICE_ID !== pc.PRICE_ID &&
                      Number.parseInt(k.START_DATE) <= Number.parseInt(currDate) &&
                      ['MKU', 'MKD'].includes(k.TRANS_TYPE),
                  );
                  if (notEOP) {
                    psPrice.pcNormal = notEOP.PRICE_CHANGE_NO;
                    psPrice.pcNormalStatus = notEOP.STATUS;
                    psPrice.pcNormalTransType = notEOP.TRANS_TYPE;
                    psPrice.pcNormalType = notEOP.PRICE_CHANGE_TYPE;
                    psPrice.pcNormalTypeValue = notEOP.PRICE_CHANGE_TYPE_VALUE;
                    psPrice.pcNormalPrice = notEOP.NEW_SELL_PRICE;
                    psPrice.pcNormalStartDate = notEOP.START_DATE;
                    psPrice.pcNormalEndDate = notEOP.END_DATE;
                    psPrice.pcNormalStartTime = notEOP.DAILY_START_TIME;
                    psPrice.pcNormalEndTime = notEOP.DAILY_END_TIME;
                    psPrice.priceFrom = 'pricechange';

                    psPrice.normalPrice = notEOP.NEW_SELL_PRICE ?? "0";
                    psPrice.startTime = notEOP.START_DATE
                      ? moment(`${notEOP.START_DATE}-${notEOP.DAILY_START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                      : null;
                    psPrice.endTime = notEOP.END_DATE
                      ? moment(`${notEOP.END_DATE}-${notEOP.DAILY_END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                      : null;
                  } else {
                    psPrice.pcNormal = pc.PRICE_CHANGE_NO;
                    psPrice.pcNormalStatus = pc.STATUS;
                    psPrice.pcNormalTransType = pc.TRANS_TYPE;
                    psPrice.pcNormalType = pc.PRICE_CHANGE_TYPE;
                    psPrice.pcNormalTypeValue = pc.PRICE_CHANGE_TYPE_VALUE;
                    psPrice.pcNormalPrice = pc.NEW_SELL_PRICE;
                    psPrice.pcNormalStartDate = pc.START_DATE;
                    psPrice.pcNormalEndDate = pc.END_DATE;
                    psPrice.pcNormalStartTime = pc.DAILY_START_TIME;
                    psPrice.pcNormalEndTime = pc.DAILY_END_TIME;
                    psPrice.priceFrom = 'pricechange';

                    psPrice.normalPrice = pc.NEW_SELL_PRICE ?? "0";
                    psPrice.startTime = pc.START_DATE
                      ? moment(`${pc.START_DATE}-${pc.DAILY_START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                      : null;
                    psPrice.endTime = pc.END_DATE
                      ? moment(`${pc.END_DATE}-${pc.DAILY_END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                      : null;
                  }
                }
              } else if (['MKU', 'MKD'].includes(pc.TRANS_TYPE)) {
                psPrice.pcNormal = pc.PRICE_CHANGE_NO;
                psPrice.pcNormalStatus = pc.STATUS;
                psPrice.pcNormalTransType = pc.TRANS_TYPE;
                psPrice.pcNormalType = pc.PRICE_CHANGE_TYPE;
                psPrice.pcNormalTypeValue = pc.PRICE_CHANGE_TYPE_VALUE;
                psPrice.pcNormalPrice = pc.NEW_SELL_PRICE;
                psPrice.pcNormalStartDate = pc.START_DATE;
                psPrice.pcNormalEndDate = pc.END_DATE;
                psPrice.pcNormalStartTime = pc.DAILY_START_TIME;
                psPrice.pcNormalEndTime = pc.DAILY_END_TIME;
                psPrice.priceFrom = 'pricechange';

                psPrice.normalPrice = pc.NEW_SELL_PRICE ?? "0";
                psPrice.startTime = pc.START_DATE
                  ? moment(`${pc.START_DATE}-${pc.DAILY_START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                  : null;
                psPrice.endTime = pc.END_DATE
                  ? moment(`${pc.END_DATE}-${pc.DAILY_END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                  : null;
                const promoPc = filteredPc.find(
                  (i) =>
                    i.PRICE_ID !== pc.PRICE_ID &&
                    Number.parseInt(i.START_DATE) <= Number.parseInt(currDate) &&
                    ['PDC'].includes(i.TRANS_TYPE),
                );
                if (promoPc) {
                  psPrice.pcNo = promoPc.PRICE_CHANGE_NO;
                  psPrice.pcStatus = promoPc.STATUS;
                  psPrice.pcTransType = promoPc.TRANS_TYPE;
                  psPrice.pcType = promoPc.PRICE_CHANGE_TYPE;
                  psPrice.pcTypeValue = promoPc.PRICE_CHANGE_TYPE_VALUE;
                  psPrice.pcPrice = promoPc.NEW_SELL_PRICE;
                  psPrice.pcStartDate = promoPc.START_DATE;
                  psPrice.pcEndDate = promoPc.END_DATE;
                  psPrice.pcStartTime = promoPc.DAILY_START_TIME;
                  psPrice.pcEndTime = promoPc.DAILY_END_TIME;
                  psPrice.priceFrom = 'pricechange';

                  psPrice.promoPrice = promoPc.NEW_SELL_PRICE;
                  psPrice.startTime = promoPc.START_DATE
                    ? moment(`${promoPc.START_DATE}-${promoPc.DAILY_START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                    : null;
                  psPrice.endTime = promoPc.END_DATE
                    ? moment(`${promoPc.END_DATE}-${promoPc.DAILY_END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                    : null;
                }
              } else {
                psPrice.pcNo = pc.PRICE_CHANGE_NO;
                psPrice.pcStatus = pc.STATUS;
                psPrice.pcTransType = pc.TRANS_TYPE;
                psPrice.pcType = pc.PRICE_CHANGE_TYPE;
                psPrice.pcTypeValue = pc.PRICE_CHANGE_TYPE_VALUE;
                psPrice.pcNormalPrice = pc.LAST_SELL_PRICE;
                psPrice.pcPrice = pc.NEW_SELL_PRICE;
                psPrice.pcStartDate = pc.START_DATE;
                psPrice.pcEndDate = pc.END_DATE;
                psPrice.pcStartTime = pc.DAILY_START_TIME;
                psPrice.pcEndTime = pc.DAILY_END_TIME;
                psPrice.priceFrom = 'pricechange';

                psPrice.normalPrice = pc.LAST_SELL_PRICE ?? "0";
                psPrice.promoPrice = pc.NEW_SELL_PRICE;
                psPrice.startTime = pc.START_DATE
                  ? moment(`${pc.START_DATE}-${pc.DAILY_START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                  : null;
                psPrice.endTime = pc.END_DATE
                  ? moment(`${pc.END_DATE}-${pc.DAILY_END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                  : null;
                const mkumkd = filteredPc.find(
                  (k) =>
                    k.PRICE_ID !== pc.PRICE_ID &&
                    Number.parseInt(k.START_DATE) <= Number.parseInt(currDate) &&
                    ['MKU', 'MKD'].includes(k.TRANS_TYPE),
                );
                if (mkumkd) {
                  psPrice.pcNormal = mkumkd.PRICE_CHANGE_NO;
                  psPrice.pcNormalStatus = mkumkd.STATUS;
                  psPrice.pcNormalTransType = mkumkd.TRANS_TYPE;
                  psPrice.pcNormalType = mkumkd.PRICE_CHANGE_TYPE;
                  psPrice.pcNormalTypeValue = mkumkd.PRICE_CHANGE_TYPE_VALUE;
                  psPrice.pcNormalPrice = mkumkd.NEW_SELL_PRICE;
                  psPrice.pcNormalStartDate = mkumkd.START_DATE;
                  psPrice.pcNormalEndDate = mkumkd.END_DATE;
                  psPrice.pcNormalStartTime = mkumkd.DAILY_START_TIME;
                  psPrice.pcNormalEndTime = mkumkd.DAILY_END_TIME;
                  psPrice.priceFrom = 'pricechange';

                  psPrice.normalPrice = mkumkd.NEW_SELL_PRICE ?? "0";
                }
              }
            }
            //Nếu không có pricechange nào thì tính theo items_sell_prices
            else {
              //Lọc items_sell_prices theo store
              const isp = itemsellprices.find((i) => i.STORE === psPrice.store);
              if (isp) {
                // psPrice.normalPrice = isp.CURRENT_PRICE;
                psPrice.normalPrice = isp.CURRENT_PRICE ?? "0"
                psPrice.priceFrom = 'itemsellprice';

                //Lấy grouppricechane có store, category phù hợp và startdate nhỏ hơn hoặc bằng ngày hiện tại
                const gpc = grouppricechanges.find(
                  (i) =>
                    i.STORE === psPrice.store &&
                    i.CATEGORY === psPrice.category &&
                    Number.parseInt(i.START_DATE) <= Number.parseInt(currDate),
                );
                if (gpc) {
                  psPrice.gpcNo = gpc.PRICE_CHANGE_NO;
                  psPrice.gpcStatus = gpc.STATUS;
                  psPrice.gpcTransType = gpc.TRANS_TYPE;
                  psPrice.gpcType = gpc.PRICE_CHANGE_TYPE;
                  psPrice.gpcTypeValue = gpc.PRICE_CHANGE_TYPE_VALUE;
                  psPrice.gpcStartDate = gpc.START_DATE;
                  psPrice.gpcEndDate = gpc.END_DATE;
                  psPrice.gpcStartTime = gpc.START_TIME;
                  psPrice.gpcEndTime = gpc.END_TIME;
                  psPrice.priceFrom = 'grouppricechange';

                  const price =
                    (Number.parseFloat(psPrice.normalPrice) * (100.0 - Number.parseFloat(gpc.PRICE_CHANGE_TYPE_VALUE))) /
                    100;
                  psPrice.promoPrice = price.toFixed(2);
                  psPrice.gpcPrice = price.toFixed(2);
                  psPrice.startTime = gpc.START_DATE
                    ? moment(`${gpc.START_DATE}-${gpc.START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                    : null;
                  psPrice.endTime = gpc.END_DATE
                    ? moment(`${gpc.END_DATE}-${gpc.END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
                    : null;
                }
              }
              else {
                remainStores.push(store)
              //   // errors.push({
              //   //   sku,
              //   //   error: `Không có items_sell_prices và pricechanges phù hợp cho store ${psPrice.store}`,
              //   // });
              //   // continue;
              //   if (remainStores.includes(psPrice.store)) {
              //     psPrice.normalPrice = sku.ITEM_SELL_PRICE ?? "0"
              //     psPrice.priceFrom = 'bi_itemsellprice';

              //     //Lấy grouppricechane có store, category phù hợp và startdate nhỏ hơn hoặc bằng ngày hiện tại
              //     const gpc = grouppricechanges.find(
              //       (i) =>
              //         i.STORE === psPrice.store &&
              //         i.CATEGORY === psPrice.category &&
              //         Number.parseInt(i.START_DATE) <= Number.parseInt(currDate),
              //     );
              //     if (gpc) {
              //       psPrice.gpcNo = gpc.PRICE_CHANGE_NO;
              //       psPrice.gpcStatus = gpc.STATUS;
              //       psPrice.gpcTransType = gpc.TRANS_TYPE;
              //       psPrice.gpcType = gpc.PRICE_CHANGE_TYPE;
              //       psPrice.gpcTypeValue = gpc.PRICE_CHANGE_TYPE_VALUE;
              //       psPrice.gpcStartDate = gpc.START_DATE;
              //       psPrice.gpcEndDate = gpc.END_DATE;
              //       psPrice.gpcStartTime = gpc.START_TIME;
              //       psPrice.gpcEndTime = gpc.END_TIME;
              //       psPrice.priceFrom = 'grouppricechange';

              //       const price =
              //         (Number.parseFloat(psPrice.normalPrice) * (100.0 - Number.parseFloat(gpc.PRICE_CHANGE_TYPE_VALUE))) /
              //         100;
              //       psPrice.promoPrice = price.toFixed(2);
              //       psPrice.gpcPrice = price.toFixed(2);
              //       psPrice.startTime = gpc.START_DATE
              //         ? moment(`${gpc.START_DATE}-${gpc.START_TIME}`, 'YYYYMMDD-HHmmss').toDate()
              //         : null;
              //       psPrice.endTime = gpc.END_DATE
              //         ? moment(`${gpc.END_DATE}-${gpc.END_TIME}`, 'YYYYMMDD-HHmmss').toDate()
              //         : null;
              //     }
              //   }
              }
            }
            if (isActiveMemberDay) {
              if (psPrice.member === 'Y') {
                let memdate = currDate;
                if (is04or19 && !isBefore18h) {
                  memdate = moment(currDate, 'YYYYMMDD').add(1, 'day').format('YYYYMMDD');
                }
                if (psPrice.promoPrice) {
                  psPrice.oriPromoPrice = psPrice.promoPrice;
                  const memprice = (Number.parseFloat(psPrice.promoPrice) * 95.0) / 100;
                  psPrice.promoPrice = memprice.toFixed(2);
                } else {
                  const memprice = (Number.parseFloat(psPrice.normalPrice) * 95.0) / 100;
                  psPrice.promoPrice = memprice.toFixed(2);
                }
                psPrice.startTime = moment(memdate, 'YYYYMMDD').toDate();
                psPrice.endTime = moment(memdate, 'YYYYMMDD').toDate();
                psPrice.memberMark = true;
              }
            }
            if(psPrice.normalPrice) psPrices.push(psPrice);
          // }
        } // Kết thúc loop store
        for (const store of remainStores) {
          // if (eligibleStore.includes(store)) {
            //Tạo record giá
            const psPrice = readConnection.getRepository(PriceEntity).create({
              sku: sku.SKU_CODE,
              store,
              line: sku.LINE_ID,
              division: sku.DIVISION_ID,
              group: sku.GROUP_ID,
              dept: sku.DEPT_ID,
              category: sku.CATEGORY_ID,
              status: sku.STATUS,
              member: sku.MEMBER_DISC_ITEM,
              uomEn: sku.RETAIL_UOM,
              uomVn: uomVn,
            });

            psPrice.normalPrice = sku.ITEM_SELL_PRICE ?? "0"
            psPrice.priceFrom = 'bi_itemsellprice';

            if (isActiveMemberDay) {
              if (psPrice.member === 'Y') {
                let memdate = currDate;
                if (is04or19 && !isBefore18h) {
                  memdate = moment(currDate, 'YYYYMMDD').add(1, 'day').format('YYYYMMDD');
                }
                if (psPrice.promoPrice) {
                  psPrice.oriPromoPrice = psPrice.promoPrice;
                  const memprice = (Number.parseFloat(psPrice.promoPrice) * 95.0) / 100;
                  psPrice.promoPrice = memprice.toFixed(2);
                } else {
                  const memprice = (Number.parseFloat(psPrice.normalPrice) * 95.0) / 100;
                  psPrice.promoPrice = memprice.toFixed(2);
                }
                psPrice.startTime = moment(memdate, 'YYYYMMDD').toDate();
                psPrice.endTime = moment(memdate, 'YYYYMMDD').toDate();
                psPrice.memberMark = true;
              }
            }
            /*if(psPrice.normalPrice && psPrice.promoPrice)*/ psPrices.push(psPrice);
          // }
        } // Kết thúc loop store
        // }
        // else {

        // }
      } // Kết thúc loop sku
    }
    return { prices: psPrices, errors };
  }
}
