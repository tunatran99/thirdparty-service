import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import moment from 'moment';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { CronUpdatePrice } from '../command/cron.update.price';

@CommandHandler(CronUpdatePrice)
export class CronUpdatePriceHandler implements ICommandHandler<CronUpdatePrice, void> {
  constructor(private readonly priceService: PriceService) {}

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Transactional()
  async execute(): Promise<void> {
    const tomorrowDate = moment().add(1, 'day').format('YYYYMMDD');
    const tomorrowPcs = await this.priceServiceRepo.findPcByStartdate(tomorrowDate);
    if (tomorrowPcs && tomorrowPcs.length > 0) {
      const tomorrowSkus = tomorrowPcs.map((i) => i.SKU);
      const { prices } = await this.priceService.calcPrice(tomorrowSkus, tomorrowDate);
      await this.priceServiceRepo.savePrices(prices);
      // await this.priceService.callMobileApp(prices);
    }
  }
}
