import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFilterInfoQuery } from '../query/find.filter.info.query';
import { Inject } from '@nestjs/common';
import { FindFilterInfoResult } from '../query/find.filter.info.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';

@QueryHandler(FindFilterInfoQuery)
export class FindFilterInfoQueryHandler implements IQueryHandler<FindFilterInfoQuery, FindFilterInfoResult> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(): Promise<FindFilterInfoResult> {
    const { partners, stores, lines, groups, depts, cates } = await this.skuPricesQuery.findFilterInfo();

    return {
      partners,
      stores,
      lines,
      groups,
      depts,
      cates
    };
  }
}
