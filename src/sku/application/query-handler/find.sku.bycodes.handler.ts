import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSkuPricesByCodesQuery } from '../query/find.sku.prices.bycodes.query';
import { Inject } from '@nestjs/common';
import { FindSkuPricesByCodesResult } from '../query/find.sku.prices.bycodes.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { PriceService } from 'src/sku/domain/price.service';
import { SkuPricesFoundByCodesEvent } from '../event/sku.prices.found.bycodes';

@QueryHandler(FindSkuPricesByCodesQuery)
export class FindSkuPricesByCodesQueryHandler
  implements IQueryHandler<FindSkuPricesByCodesQuery, FindSkuPricesByCodesResult>
{
  constructor(readonly eventBus: EventBus, private readonly mbAppService: PriceService) {}

  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ partnerId, codes }: FindSkuPricesByCodesQuery): Promise<FindSkuPricesByCodesResult> {
    const prices = await this.skuPricesQuery.findPricesByCodes(codes, partnerId);

    const skusNotFound = codes.filter((i) => !prices.map((i) => i.sku).includes(i));
    const { success, error } = this.mbAppService.formatDataForMBApp(prices, skusNotFound);

    const partnerPrices = [];
    for (const sku of success) {
      for (const store of sku.apply_store) {
        partnerPrices.push({
          partnerId,
          sku: sku.sku_code,
          store: store.store_code,
        });
      }
    }
    this.eventBus.publish(new SkuPricesFoundByCodesEvent(partnerPrices));

    return {
      status: '1',
      message: 'success',
      data: {
        success,
        error,
      },
    };
  }
}
