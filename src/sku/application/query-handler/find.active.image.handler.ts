import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { FindActiveImageQuery } from '../query/find.active.image.query';

@QueryHandler(FindActiveImageQuery)
export class FindActiveImageHandler implements IQueryHandler<FindActiveImageQuery, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ partnerId, skuId }: FindActiveImageQuery): Promise<any> {
    return await this.skuPricesQuery.findActiveImage(partnerId, skuId);
  }
}
