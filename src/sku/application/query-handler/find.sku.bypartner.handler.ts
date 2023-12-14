import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSkuPricesByPartnerQuery } from '../query/find.sku.prices.bypartner.query';
import { Inject } from '@nestjs/common';
import { FindSkuPricesByPartnerResult } from '../query/find.sku.prices.bypartner.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { PriceService } from 'src/sku/domain/price.service';

@QueryHandler(FindSkuPricesByPartnerQuery)
export class FindSkuPricesByPartnerQueryHandler
  implements IQueryHandler<FindSkuPricesByPartnerQuery, FindSkuPricesByPartnerResult>
{
  constructor(private readonly priceService: PriceService) { }
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ data }: FindSkuPricesByPartnerQuery): Promise<any> {
    const { items, total } = await this.skuPricesQuery.findSkuPriceByPartner(
      data.offset,
      data.limit,
      data.partnerId,
      data.search,
      data.storeId,
      data.lineId,
      data.groupId,
      data.deptId,
      data.cateId,
      data.hasPromo,
      data.export,
      data.fromDate,
      data.toDate
    );

    return {
      items,
      total,
    };
  }
}
