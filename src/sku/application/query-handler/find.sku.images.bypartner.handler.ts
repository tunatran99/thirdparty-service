import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSkuImagesByPartnerQuery } from '../query/find.sku.images.bypartner.query';
import { Inject } from '@nestjs/common';
import { FindSkuImagesByPartnerResult } from '../query/find.sku.images.bypartner.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { PriceService } from 'src/sku/domain/price.service';

@QueryHandler(FindSkuImagesByPartnerQuery)
export class FindSkuImagesByPartnerQueryHandler
  implements IQueryHandler<FindSkuImagesByPartnerQuery, FindSkuImagesByPartnerResult>
{
  constructor(private readonly priceService: PriceService) { }
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ data }: FindSkuImagesByPartnerQuery): Promise<any> {
    const { items, total } = await this.skuPricesQuery.findSkuImageByPartner(
      data.offset,
      data.limit,
      data.partnerId,
      data.search
    );

    return {
      items,
      total,
    };
  }
}
