import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { GroupPricechangeEntity } from '../entity/group_price_change';
import { ItemSellPriceEntity } from '../entity/item_sell_price';
import { PriceEntity } from '../entity/price';
import { PricechangeEntity } from '../entity/price_change';
import { SkuEntity } from '../entity/sku';
import { UomEntity } from '../entity/uom';
import { SkuCodeTempEntity } from '../entity/sku_code_temp';
import { MBPriceEntity } from '../entity/mb_price';

export interface PriceServiceRepository {
  findUom: () => Promise<UomEntity[]>;
  findSkuInMenu: (skus: string[]) => Promise<SkuEntity[]>;
  findAndCountSku: (skus?: string[]) => Promise<SkuEntity[]>;
  findIspBySkus: (skus: string[]) => Promise<ItemSellPriceEntity[]>;
  findPcBySkus: (skus: string[]) => Promise<PricechangeEntity[]>;
  findCategoryBySku: (sku: string) => Promise<string>;
  findGpcByCategories: (categories: string[]) => Promise<GroupPricechangeEntity[]>;
  findMemberPrices: () => Promise<PriceEntity[]>;
  findPrice: (sku: string, store: string) => Promise<PriceEntity>;
  savePrices: (data: PriceEntity | PriceEntity[]) => Promise<void>;
  saveMBPrices: (data: MBPriceEntity | MBPriceEntity[]) => Promise<void>;
  saveMenuPrices: (data: SkuCodeTempEntity | SkuCodeTempEntity[]) => Promise<void>;
  findPcByStartdate: (startdate: string) => Promise<PricechangeEntity[]>;
  findPcByEnddate: (enddate: string) => Promise<PricechangeEntity[]>;
  updateAppliedList: (data: any[]) => Promise<void>;
}
