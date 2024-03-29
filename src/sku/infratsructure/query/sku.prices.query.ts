import { PartnerEntity } from 'src/partner/infratsructure/entity/partner';
import { FindSkuPricesByPartnerResult } from 'src/sku/application/query/find.sku.prices.bypartner.result';
import { FindSkuImagesByPartnerResult } from 'src/sku/application/query/find.sku.images.bypartner.result';
import { FindSkuPricesDetailResult } from 'src/sku/application/query/find.sku.prices.detail.result';
import { PriceEntity } from '../entity/price';
import { StoreEntity } from '../entity/store';
import { LineEntity } from 'src/bookingapp/infratsructure/entity/line';
import { GroupEntity } from 'src/bookingapp/infratsructure/entity/group';
import { DepartmentEntity } from 'src/bookingapp/infratsructure/entity/department';
import { CategoryEntity } from 'src/shopeefood/infratsructure/entity/category';
import { DivisionEntity } from 'src/bookingapp/infratsructure/entity/division';
import { MBPriceEntity } from '../entity/mb_price';
import { CheckImportImageLinkResult } from 'src/sku/application/query/check.import.image.link.result';

export interface SkuPricesQuery {
  findPricesByCodes: (codes: string[], partnerId: number) => Promise<MBPriceEntity[]>;
  findIdByCode: (code: string) => Promise<number>;
  findIdByName: (name: string) => Promise<number>;
  findSkuPriceByPartner: (
    offset: number,
    limit: number,
    partnerId: number,
    search?: string,
    storeId?: string[],
    lineId?: string[],
    groupId?: string[],
    deptId?: string[],
    cateId?: string[],
    hasPromo?: string,
    status?: number,
    isExporting?: boolean,
    fromDate?: string,
    toDate?: string
  ) => Promise<FindSkuPricesByPartnerResult>;
  findSkuImageByPartner: (
    offset: number,
    limit: number,
    partnerId: number,
    search?: string
  ) => Promise<FindSkuImagesByPartnerResult>;
  findPartners: (partnerId?: string[]) => Promise<PartnerEntity[]>;
  findLines: (partnerId?: number) => Promise<any>;
  findStores: (refId?: number, storeId?: string[]) => Promise<any>;
  findDivs: (refId?: string[]) => Promise<any>;
  findGroups: (refId?: string[]) => Promise<any>;
  findDepts: (refId?: string[]) => Promise<any>;
  findCates: (refId?: string[]) => Promise<any>;
  findThirdPartyCates: (refId?: string[]) => Promise<any>;
  findCateByCode: (code: string) => Promise<any>;
  checkImportImageLink: (sku: string, partner: string, type?: string) => Promise<CheckImportImageLinkResult>;
  findSkuPricesDetail: (partnerId: number, sku: string) => Promise<FindSkuPricesDetailResult>;
  findActiveImage: (partnerId: number, skuId: number) => Promise<any>;
}
