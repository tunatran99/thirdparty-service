import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSkuPricesDetailQuery } from '../query/find.sku.prices.detail.query';
import { Inject } from '@nestjs/common';
import { FindSkuPricesDetailResult } from '../query/find.sku.prices.detail.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';

@QueryHandler(FindSkuPricesDetailQuery)
export class FindSkuPricesDetailQueryHandler
  implements IQueryHandler<FindSkuPricesDetailQuery, FindSkuPricesDetailResult>
{
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ partnerId, sku }: FindSkuPricesDetailQuery): Promise<FindSkuPricesDetailResult> {
    return await this.skuPricesQuery.findSkuPricesDetail(partnerId, sku);
  }
}
