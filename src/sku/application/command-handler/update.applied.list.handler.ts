import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { UpdateAppliedList } from '../command/update.applied.list';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { PriceService } from 'src/sku/domain/price.service';

@CommandHandler(UpdateAppliedList)
export class UpdateAppliedListHandler implements ICommandHandler<UpdateAppliedList, void> {
  constructor(private readonly priceService: PriceService) { }

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  @Transactional()
  async execute({ items }: UpdateAppliedList): Promise<any> {
    await this.priceServiceRepo.updateAppliedList(items);
    //Thêm logic gọi đến partner để cập nhật skus
    const partnerId = items[0].partnerId;
    const sku = items[0].sku;
    if (partnerId.toLowerCase() === 'shopeefood') {
      //partner MB App
      console.log('call MB App');
      // const prices = await this.skuPricesQuery.findPricesByCodes([sku], partnerId);
      // return await this.priceService.callMobileApp(prices);
      // const promises = [];
      for (const item of items) {
        // return await this.priceService.syncMenu(item.store);
        // promises.push(res);
      }
      // await Promise.all(promises);
    }
  }
}
