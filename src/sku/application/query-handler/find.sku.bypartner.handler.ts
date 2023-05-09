import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSkuPricesByPartnerQuery } from '../query/find.sku.prices.bypartner.query';
import { Inject } from '@nestjs/common';
import { FindSkuPricesByPartnerResult } from '../query/find.sku.prices.bypartner.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';

@QueryHandler(FindSkuPricesByPartnerQuery)
export class FindSkuPricesByPartnerQueryHandler
  implements IQueryHandler<FindSkuPricesByPartnerQuery, FindSkuPricesByPartnerResult>
{
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ data }: FindSkuPricesByPartnerQuery): Promise<any> {
    const { items, total } = await this.skuPricesQuery.findSkuPriceByPartner(
      data.offset,
      data.limit,
      data.partnerId,
      data.search,
      data.storeId,
    );

    return {
      items,
      total,
    };
  }
}
