import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import moment from 'moment';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { CronUpdatePrice } from '../command/cron.update.price';
import * as ExcelJS from 'exceljs';
import * as _ from 'lodash';

@CommandHandler(CronUpdatePrice)
export class CronUpdatePriceHandler implements ICommandHandler<CronUpdatePrice, void> {
  constructor(private readonly priceService: PriceService) { }

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Transactional()
  async execute(): Promise<void> {
    const tomorrowDate = moment().add('1', 'day').format('YYYYMMDD');
    const tomorrowPcs = await this.priceServiceRepo.findPcByStartdate(tomorrowDate);
    if (tomorrowPcs && tomorrowPcs.length > 0) {
      const tomorrowSkus = tomorrowPcs.map((i) => i.SKU);
      const { prices } = await this.priceService.calcPrice(tomorrowSkus, tomorrowDate);
      // const chunks = _.chunk(prices, 10);
      // for (const [chunkIndex, chunk] of chunks.entries()) {
      //   // if (chunkIndex > 5) continue;
      //   console.log(
      //     `${moment().format('DD/MM/YYYY HH:mm:ss')} - Insert chunk ${chunkIndex + 1}/${chunks.length} ...`,
      //   );
      //   await this.priceServiceRepo.savePrices(chunk)
      //   console.log(
      //     `${moment().format('DD/MM/YYYY HH:mm:ss')} - Inserted ${chunkIndex + 1}/${chunks.length} chunk`,
      //   );
      // }
      //   const wbs = {},
      //   wss = {};
      //   for (const price of prices) {
      //     if (!wbs[price.dept]) {
      //       wbs[price.dept] = new ExcelJS.stream.xlsx.WorkbookWriter({
      //         filename: `src/newsku/${price.dept}.xlsx`,
      //       });
      //       wss[price.dept] = wbs[price.dept].addWorksheet();
      //       wss[price.dept]
      //         .addRow([
      //           'sku',
      //           'store',
      //           'line',
      //           'division',
      //           'group',
      //           'dept',
      //           'category',
      //           'status',
      //           'member',
      //           'uomEn',
      //           'uomVn',
      //           'normalPrice',
      //           'promoPrice',
      //           'oriPromoPrice',
      //           'startTime',
      //           'endTime',
      //           'memberMark',
      //           'pcNo',
      //           'pcStatus',
      //           'pcTransType',
      //           'pcType',
      //           'pcTypeValue',
      //           'pcPrice',
      //           'pcStartDate',
      //           'pcEndDate',
      //           'pcStartTime',
      //           'pcEndTime',
      //           'pcNormal',
      //           'pcNormalStatus',
      //           'pcNormalTransType',
      //           'pcNormalType',
      //           'pcNormalTypeValue',
      //           'pcNormalPrice',
      //           'pcNormalStartDate',
      //           'pcNormalEndDate',
      //           'pcNormalStartTime',
      //           'pcNormalEndTime',
      //           'gpcNo',
      //           'gpcStatus',
      //           'gpcTransType',
      //           'gpcType',
      //           'gpcTypeValue',
      //           'gpcPrice',
      //           'gpcStartDate',
      //           'gpcEndDate',
      //           'gpcStartTime',
      //           'gpcEndTime',
      //           'priceFrom',
      //         ])
      //         .commit();
      //     }
      //     wss[price.dept]
      //       .addRow([
      //         price.sku,
      //         price.store,
      //         price.line,
      //         price.division,
      //         price.group,
      //         price.dept,
      //         price.category,
      //         price.status,
      //         price.member,
      //         price.uomEn,
      //         price.uomVn,
      //         price.normalPrice,
      //         price.promoPrice,
      //         price.oriPromoPrice,
      //         price.startTime,
      //         price.endTime,
      //         price.memberMark,
      //         price.pcNo,
      //         price.pcStatus,
      //         price.pcTransType,
      //         price.pcType,
      //         price.pcTypeValue,
      //         price.pcPrice,
      //         price.pcStartDate,
      //         price.pcEndDate,
      //         price.pcStartTime,
      //         price.pcEndTime,
      //         price.pcNormal,
      //         price.pcNormalStatus,
      //         price.pcNormalTransType,
      //         price.pcNormalType,
      //         price.pcNormalTypeValue,
      //         price.pcNormalPrice,
      //         price.pcNormalStartDate,
      //         price.pcNormalEndDate,
      //         price.pcNormalStartTime,
      //         price.pcNormalEndTime,
      //         price.gpcNo,
      //         price.gpcStatus,
      //         price.gpcTransType,
      //         price.gpcType,
      //         price.gpcTypeValue,
      //         price.gpcPrice,
      //         price.gpcStartDate,
      //         price.gpcEndDate,
      //         price.gpcStartTime,
      //         price.gpcEndTime,
      //         price.priceFrom,
      //       ])
      //       .commit();
      //   }

      // for (const key of Object.keys(wbs)) {
      //   await wbs[key].commit();
      // }
      //   const { prices } = await this.priceService.calcPrice(skuCodes);
      // const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
      //   filename: `src/newsku/9993.xlsx`,
      // });
      // const ws = wb.addWorksheet();
      // ws.addRow([
      //   'sku',
      //   'store',
      //   'line',
      //   'division',
      //   'group',
      //   'dept',
      //   'category',
      //   'status',
      //   'member',
      //   'uomEn',
      //   'uomVn',

      //   'normal price',
      //   'promo price',
      //   'ori promo price',
      //   'start time',
      //   'end time',
      //   'member mark',

      //   'pc no',
      //   'pc status',
      //   'pc trans type',
      //   'pc type',
      //   'pc type value',
      //   'pc price',
      //   'pc start date',
      //   'pc end start',
      //   'pc start time',
      //   'pc end time',

      //   'pc normal',
      //   'pc normal status',
      //   'pc normal trans type',
      //   'pc normal type',
      //   'pc normal type value',
      //   'pc normal price',
      //   'pc normal start date',
      //   'pc normal end date',
      //   'pc normal start time',
      //   'pc normal end time',

      //   'gpc no',
      //   'gpc status',
      //   'gpc trans type',
      //   'gpc type',
      //   'gpc type value',
      //   'gpc price',
      //   'gpc start date',
      //   'gpc end date',
      //   'gpc start time',
      //   'gpc end time',

      //   'price from',
      // ]).commit();
      // for (const price of prices) {
      //   ws.addRow([
      //     price.sku,
      //     price.store,
      //     price.line,
      //     price.division,
      //     price.group,
      //     price.dept,
      //     price.category,
      //     price.status,
      //     price.member,
      //     price.uomEn,
      //     price.uomVn,

      //     price.normalPrice,
      //     price.promoPrice,
      //     price.oriPromoPrice,
      //     price.startTime,
      //     price.endTime,
      //     price.memberMark,

      //     price.pcNo,
      //     price.pcStatus,
      //     price.pcTransType,
      //     price.pcType,
      //     price.pcTypeValue,
      //     price.pcPrice,
      //     price.pcStartDate,
      //     price.pcEndDate,
      //     price.pcStartTime,
      //     price.pcEndTime,

      //     price.pcNormal,
      //     price.pcNormalStatus,
      //     price.pcNormalTransType,
      //     price.pcNormalType,
      //     price.pcNormalTypeValue,
      //     price.pcNormalPrice,
      //     price.pcNormalStartDate,
      //     price.pcNormalEndDate,
      //     price.pcNormalStartTime,
      //     price.pcNormalEndTime,

      //     price.gpcNo,
      //     price.gpcStatus,
      //     price.gpcTransType,
      //     price.gpcType,
      //     price.gpcTypeValue,
      //     price.gpcPrice,
      //     price.gpcStartDate,
      //     price.gpcEndDate,
      //     price.gpcStartTime,
      //     price.gpcEndTime,

      //     price.priceFrom,
      //   ]).commit();
      // }
      // await wb.commit();
      // await this.priceServiceRepo.savePrices(prices);
      try {
        await this.priceService.callMobileApp(prices);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
}
