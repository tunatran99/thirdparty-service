import { PartnerEntity } from 'src/partner/infratsructure/entity/partner';
import { FindSkuPricesByPartnerResult } from 'src/sku/application/query/find.sku.prices.bypartner.result';
import { FindSkuPricesDetailResult } from 'src/sku/application/query/find.sku.prices.detail.result';
import { PriceEntity } from '../entity/price';
import { StoreEntity } from '../entity/store';
import { LineEntity } from 'src/bookingapp/infratsructure/entity/line';
import { GroupEntity } from 'src/bookingapp/infratsructure/entity/group';
import { DepartmentEntity } from 'src/bookingapp/infratsructure/entity/department';
import { CategoryEntity } from 'src/bookingapp/infratsructure/entity/category';

export interface SkuPricesQuery {
  findPricesByCodes: (codes: string[], partnerId: number) => Promise<PriceEntity[]>;
  findSkuPriceByPartner: (
    offset: number,
    limit: number,
    partnerId: number,
    search?: string,
    storeId?: string,
  ) => Promise<FindSkuPricesByPartnerResult>;
  findFilterInfo: () => Promise<{ partners: PartnerEntity[]; stores: StoreEntity[]; 
  lines: LineEntity[]; groups: GroupEntity[]; depts: DepartmentEntity[]; cates: CategoryEntity[] }>;
  findSkuPricesDetail: (partnerId: number, sku: string) => Promise<FindSkuPricesDetailResult>;
}
