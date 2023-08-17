import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import moment from 'moment';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { NewCronUpdatePrice } from '../command/new.cron.update.price';
import * as ExcelJS from 'exceljs';

@CommandHandler(NewCronUpdatePrice)
export class NewCronUpdatePriceHandler implements ICommandHandler<NewCronUpdatePrice, void> {
  constructor(private readonly priceService: PriceService) {}

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Transactional()
  async execute(): Promise<void> {
    const prevDate = moment().format('YYYYMMDD');
    console.log(prevDate)
    const skusRaw = await this.priceServiceRepo.findLatestSku(prevDate);
    // console.log(skusRaw);
    if (skusRaw && skusRaw.length > 0) {
      const skus = skusRaw.map((i) => i.SKU_CODE);
      const { prices } = await this.priceService.calcPrice(skus);
      const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
        filename: `src/newsku/9997.xlsx`,
      });
      const ws = wb.addWorksheet();
      ws.addRow([
        'sku',
        'store',
        'line',
        'division',
        'group',
        'dept',
        'category',
        'status',
        'member',
        'uomEn',
        'uomVn',
  
        'normal price',
        'promo price',
        'ori promo price',
        'start time',
        'end time',
        'member mark',
  
        'pc no',
        'pc status',
        'pc trans type',
        'pc type',
        'pc type value',
        'pc price',
        'pc start date',
        'pc end start',
        'pc start time',
        'pc end time',
  
        'pc normal',
        'pc normal status',
        'pc normal trans type',
        'pc normal type',
        'pc normal type value',
        'pc normal price',
        'pc normal start date',
        'pc normal end date',
        'pc normal start time',
        'pc normal end time',
  
        'gpc no',
        'gpc status',
        'gpc trans type',
        'gpc type',
        'gpc type value',
        'gpc price',
        'gpc start date',
        'gpc end date',
        'gpc start time',
        'gpc end time',
  
        'price from',
      ]).commit();
      for (const psPrice of prices) {
        ws.addRow([
          psPrice.sku,
          psPrice.store,
          psPrice.line,
          psPrice.division,
          psPrice.group,
          psPrice.dept,
          psPrice.category,
          psPrice.status,
          psPrice.member,
          psPrice.uomEn,
          psPrice.uomVn,
  
          psPrice.normalPrice,
          psPrice.promoPrice,
          psPrice.oriPromoPrice,
          psPrice.startTime,
          psPrice.endTime,
          psPrice.memberMark,
  
          psPrice.pcNo,
          psPrice.pcStatus,
          psPrice.pcTransType,
          psPrice.pcType,
          psPrice.pcTypeValue,
          psPrice.pcPrice,
          psPrice.pcStartDate,
          psPrice.pcEndDate,
          psPrice.pcStartTime,
          psPrice.pcEndTime,
  
          psPrice.pcNormal,
          psPrice.pcNormalStatus,
          psPrice.pcNormalTransType,
          psPrice.pcNormalType,
          psPrice.pcNormalTypeValue,
          psPrice.pcNormalPrice,
          psPrice.pcNormalStartDate,
          psPrice.pcNormalEndDate,
          psPrice.pcNormalStartTime,
          psPrice.pcNormalEndTime,
  
          psPrice.gpcNo,
          psPrice.gpcStatus,
          psPrice.gpcTransType,
          psPrice.gpcType,
          psPrice.gpcTypeValue,
          psPrice.gpcPrice,
          psPrice.gpcStartDate,
          psPrice.gpcEndDate,
          psPrice.gpcStartTime,
          psPrice.gpcEndTime,
  
          psPrice.priceFrom,
        ]).commit();
      }
      await wb.commit();
      console.log(prices.length);
      // await this.priceServiceRepo.savePrices(prices);
      // await this.priceService.callMobileApp(prices);
    }
  }
}
