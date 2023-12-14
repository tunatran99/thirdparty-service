import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindFilterInfoQuery, FindCategory,
  FindDepartment,
  FindDivision,
  FindGroup, 
  FindStore} from '../query/find.filter.info.query';
import { Inject } from '@nestjs/common';
import { FindFilterInfoResult } from '../query/find.filter.info.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';

@QueryHandler(FindFilterInfoQuery)
export class FindFilterInfoQueryHandler implements IQueryHandler<FindFilterInfoQuery, FindFilterInfoResult> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ partnerId }: FindFilterInfoQuery): Promise<FindFilterInfoResult> {
    const { partners, lines, cates } = await this.skuPricesQuery.findFilterInfo(partnerId);

    return {
      partners,
      lines,
      cates
    };
  }
}

@QueryHandler(FindStore)
export class FindStoreHandler implements IQueryHandler<FindStore, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(q: FindStore): Promise<any> {
    return await this.skuPricesQuery.findStores(q.refId, q.storeId);
  }
}

@QueryHandler(FindDivision)
export class FindDivisionHandler implements IQueryHandler<FindDivision, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(q: FindDivision): Promise<any> {
    return await this.skuPricesQuery.findDivs(q.refId);
  }
}

@QueryHandler(FindGroup)
export class FindGroupHandler implements IQueryHandler<FindGroup, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(q: FindGroup): Promise<any> {
    return await this.skuPricesQuery.findGroups(q.refId);
  }
}

@QueryHandler(FindDepartment)
export class FindDepartmentHandler implements IQueryHandler<FindDepartment, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(q: FindDepartment): Promise<any> {
    return await this.skuPricesQuery.findDepts(q.refId);
  }
}

@QueryHandler(FindCategory)
export class FindCategoryHandler implements IQueryHandler<FindCategory, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(q: FindCategory): Promise<any> {
    return await this.skuPricesQuery.findCates(q.refId);
  }
}