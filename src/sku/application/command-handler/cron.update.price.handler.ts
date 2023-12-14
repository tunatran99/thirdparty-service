import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import moment from 'moment';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { CronUpdatePrice } from '../command/cron.update.price';
import * as ExcelJS from 'exceljs';
import * as _ from 'lodash';
import { readConnection } from '@libs/database.module';
import { SkuCodeTempEntity } from 'src/sku/infratsructure/entity/sku_code_temp';

@CommandHandler(CronUpdatePrice)
export class CronUpdatePriceHandler implements ICommandHandler<CronUpdatePrice, void> {
  constructor(private readonly priceService: PriceService) { }

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Transactional()
  async execute(): Promise<void> {
    let now = moment();
    const isBefore18h = moment().isBefore(now.hour(18));
    const is04or19 = now.format('DD') === '04' || now.format('DD') === '19';
    const is05or20 = now.format('DD') === '05' || now.format('DD') === '20';
    const isActiveMemberDay = (is04or19 && !isBefore18h) || (is05or20 && isBefore18h);

    const tomorrowDate = moment().add('1', 'day').format('YYYYMMDD');
    // const now = moment().format('YYYYMMDD');
    const tomorrowPcs = await this.priceServiceRepo.findPcByStartdate(tomorrowDate);
    const expiredPcs = await this.priceServiceRepo.findPcByEnddate(now.format('YYYYMMDD'));
    
    let tomorrowSkus: string[], expSkus: string[];
    if (expiredPcs && expiredPcs.length > 0) expSkus = expiredPcs.map((i) => i.SKU);
    
    if (tomorrowPcs && tomorrowPcs.length > 0) {
      tomorrowSkus = tomorrowPcs.map((i) => i.SKU);
      // const { prices } = await this.priceService.calcPrice(tomorrowSkus, tomorrowDate, false);
      // try {
      //   const realPricesToSend = prices.map(price => {
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
      //   await this.priceService.callMobileApp(realPricesToSend);
      // }
      // catch (err) {
      //   console.log(err);
      // }
    }
    
    const validSkus = [...tomorrowSkus, ...expSkus];
    const tomorrowMenu = await this.priceServiceRepo.findSkuInMenu(validSkus);

    if (tomorrowMenu && tomorrowMenu.length > 0) {
      console.log('Cập nhật giá các SKU:', JSON.stringify(tomorrowMenu.map(menu => menu.SKU_CODE)))
      const skuTemps: SkuCodeTempEntity[] = [];

      for(const menu of tomorrowMenu) {
        const skuTemp = readConnection.getRepository(SkuCodeTempEntity).create({ SKU_CODE: menu.SKU_CODE });
        skuTemps.push(skuTemp)
      }
      // console.log(skuTemps)
      await this.priceServiceRepo.saveMenuPrices(skuTemps);
    }
  }
}
