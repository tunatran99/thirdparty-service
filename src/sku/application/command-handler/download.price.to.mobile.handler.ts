import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { DownloadPriceToMobile } from '../command/download.price.to.mobile';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { CompareService } from 'src/app/compare/compare.service';
import * as ExcelJS from 'exceljs';
import _ from 'lodash';
import moment from 'moment';
// import * as _ from 'lodash';

@CommandHandler(DownloadPriceToMobile)
export class DownloadPriceToMobileHandler implements ICommandHandler<DownloadPriceToMobile, void> {
  constructor(private readonly priceService: PriceService/*, 
    private readonly compareService: CompareService*/) { }

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  @Transactional()
  async execute({ skuCodes }: DownloadPriceToMobile): Promise<any> {
    // const skuList = await this.compareService.testFunction();
    // // console.log(skuList)
    // const skuChunks = _.chunk(skuCodes, 25)
    // for (const [chunkIndex, skuChunk] of skuChunks.entries()) {
    //   const { prices } = await this.priceService.calcPrice(skuChunk);
    //   const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
    //     filename: `src/newsku/999${chunkIndex}.xlsx`,
    //   });
    //   const ws = wb.addWorksheet();
    //   ws.addRow([
    //     'sku',
    //     'store',
    //     'line',
    //     'division',
    //     'group',
    //     'dept',
    //     'category',
    //     'status',
    //     'member',
    //     'uomEn',
    //     'uomVn',

    //     'normal price',
    //     'promo price',
    //     'ori promo price',
    //     'start time',
    //     'end time',
    //     'member mark',

    //     'pc no',
    //     'pc status',
    //     'pc trans type',
    //     'pc type',
    //     'pc type value',
    //     'pc price',
    //     'pc start date',
    //     'pc end start',
    //     'pc start time',
    //     'pc end time',

    //     'pc normal',
    //     'pc normal status',
    //     'pc normal trans type',
    //     'pc normal type',
    //     'pc normal type value',
    //     'pc normal price',
    //     'pc normal start date',
    //     'pc normal end date',
    //     'pc normal start time',
    //     'pc normal end time',

    //     'gpc no',
    //     'gpc status',
    //     'gpc trans type',
    //     'gpc type',
    //     'gpc type value',
    //     'gpc price',
    //     'gpc start date',
    //     'gpc end date',
    //     'gpc start time',
    //     'gpc end time',

    //     'price from',
    //   ]).commit();
    //   for (const psPrice of prices) {
    //     ws.addRow([
    //       psPrice.sku,
    //       psPrice.store,
    //       psPrice.line,
    //       psPrice.division,
    //       psPrice.group,
    //       psPrice.dept,
    //       psPrice.category,
    //       psPrice.status,
    //       psPrice.member,
    //       psPrice.uomEn,
    //       psPrice.uomVn,

    //       psPrice.normalPrice,
    //       psPrice.promoPrice,
    //       psPrice.oriPromoPrice,
    //       psPrice.startTime,
    //       psPrice.endTime,
    //       psPrice.memberMark,

    //       psPrice.pcNo,
    //       psPrice.pcStatus,
    //       psPrice.pcTransType,
    //       psPrice.pcType,
    //       psPrice.pcTypeValue,
    //       psPrice.pcPrice,
    //       psPrice.pcStartDate,
    //       psPrice.pcEndDate,
    //       psPrice.pcStartTime,
    //       psPrice.pcEndTime,

    //       psPrice.pcNormal,
    //       psPrice.pcNormalStatus,
    //       psPrice.pcNormalTransType,
    //       psPrice.pcNormalType,
    //       psPrice.pcNormalTypeValue,
    //       psPrice.pcNormalPrice,
    //       psPrice.pcNormalStartDate,
    //       psPrice.pcNormalEndDate,
    //       psPrice.pcNormalStartTime,
    //       psPrice.pcNormalEndTime,

    //       psPrice.gpcNo,
    //       psPrice.gpcStatus,
    //       psPrice.gpcTransType,
    //       psPrice.gpcType,
    //       psPrice.gpcTypeValue,
    //       psPrice.gpcPrice,
    //       psPrice.gpcStartDate,
    //       psPrice.gpcEndDate,
    //       psPrice.gpcStartTime,
    //       psPrice.gpcEndTime,

    //       psPrice.priceFrom,
    //     ]).commit();
    //   }
    //   await wb.commit();
    // }
    // const skuChunks = _.chunk(skuLefts, 25)
    // let promiseAll = [];
    // for (const [chunkIndex, skuChunk] of skuChunks.entries()) {
    //   console.log("Lần loop thứ ", chunkIndex)
    //   if (chunkIndex > 135) {
    let now = moment();
    const isBefore18h = moment().isBefore(now.hour(18));
    const is04or19 = now.format('DD') === '04' || now.format('DD') === '19';
    const is05or20 = now.format('DD') === '05' || now.format('DD') === '20';
    const isActiveMemberDay = (is04or19 && !isBefore18h) || (is05or20 && isBefore18h);

    const { prices, promises } = await this.priceService.calcPrice(skuCodes, null, true);
    // if(!isBefore18h) {
    //   const { MBPrices } = await this.priceService.calcMBPrice(skuCodes)
    //   const MBPricePromise = this.priceServiceRepo.saveMBPrices(MBPrices);
    //   promises.push(MBPricePromise)
    // }
    // else {
    //   const MBPricePromise = this.priceServiceRepo.saveMBPrices(prices);
    //   promises.push(MBPricePromise)
    // }
    const pricePromise = /*await*/ this.priceServiceRepo.savePrices(prices);
    promises.push(pricePromise)
    // promiseAll = [...promiseAll, ...promises];
    // }
    await Promise.all(promises)
    // }
    // await Promise.all(promiseAll)
    // try {
    //   const pricesToSend = await this.skuPricesQuery.findPricesByCodes(skuCodes, 5);
    //   const realPricesToSend = pricesToSend.map(price => {
    //     if (isActiveMemberDay) {
    //       if (price.member === 'Y') {
    //         if (price.promoPrice) {
    //           const memprice = (Number.parseFloat(price.promoPrice) * 95.0) / 100;
    //           price.promoPrice = memprice.toFixed(2);
    //         } else {
    //           const memprice = (Number.parseFloat(price.normalPrice) * 95.0) / 100;
    //           price.promoPrice = memprice.toFixed(2);
    //         }

    //         return price;
    //       }
    //     }

    //     return price;
    //   });
    //   // await this.priceService.syncMenu('1001');
    //   return await this.priceService.callMobileApp(realPricesToSend);
    // }
    // catch (err) {
    //   console.log(err);
    // }
  }
}
