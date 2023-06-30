import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { DownloadPriceToMobile } from '../command/download.price.to.mobile';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';

@CommandHandler(DownloadPriceToMobile)
export class DownloadPriceToMobileHandler implements ICommandHandler<DownloadPriceToMobile, void> {
  constructor(private readonly priceService: PriceService) { }

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  @Transactional()
  async execute({ skuCodes }: DownloadPriceToMobile): Promise<any> {
    const { prices } = await this.priceService.calcPrice(skuCodes);
    await this.priceServiceRepo.savePrices(prices);
    // try {
    //   const pricesToSend = await this.skuPricesQuery.findPricesByCodes(skuCodes, 5);
    //   return await this.priceService.callMobileApp(pricesToSend);
    // }
    // catch (err) {
    //   console.log(err);
    // }
  }
}
