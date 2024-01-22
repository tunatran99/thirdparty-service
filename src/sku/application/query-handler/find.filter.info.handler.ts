import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPartner, FindLine, FindCategory, FindThirdpartyCategory,
  FindDepartment,
  FindDivision,
  FindGroup, 
  FindStore} from '../query/find.filter.info.query';
import { Inject } from '@nestjs/common';
import { FindFilterInfoResult } from '../query/find.filter.info.result';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';

@QueryHandler(FindPartner)
export class FindPartnerHandler implements IQueryHandler<FindPartner, FindFilterInfoResult> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ partnerId }: FindPartner): Promise<FindFilterInfoResult> {
    return await this.skuPricesQuery.findPartners(partnerId);
  }
}

@QueryHandler(FindLine)
export class FindLineHandler implements IQueryHandler<FindLine, FindFilterInfoResult> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ partnerId }: FindLine): Promise<FindFilterInfoResult> {
    return await this.skuPricesQuery.findLines(partnerId);
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

@QueryHandler(FindThirdpartyCategory)
export class FindThirdpartyCategoryHandler implements IQueryHandler<FindThirdpartyCategory, any> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute(q: FindThirdpartyCategory): Promise<any> {
    return await this.skuPricesQuery.findThirdPartyCates(q.refId);
  }
}