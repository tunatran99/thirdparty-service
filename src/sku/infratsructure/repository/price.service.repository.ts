import { GroupPricechangeEntity } from '../entity/group_price_change';
import { ItemSellPriceEntity } from '../entity/item_sell_price';
import { PriceEntity } from '../entity/price';
import { PricechangeEntity } from '../entity/price_change';
import { SkuEntity } from '../entity/sku';
import { UomEntity } from '../entity/uom';

export interface PriceServiceRepository {
  findUom: () => Promise<UomEntity[]>;
  findAndCountSku: (skus?: string[]) => Promise<SkuEntity[]>;
  findIspBySkus: (skus: string[]) => Promise<ItemSellPriceEntity[]>;
  findPcBySkus: (skus: string[]) => Promise<PricechangeEntity[]>;
  findCategoryBySku: (sku: string) => Promise<string>;
  findGpcByCategories: (categories: string[]) => Promise<GroupPricechangeEntity[]>;
  // findExpiredGpcByCategories: (categories: string[], now: string) => Promise<GroupPricechangeEntity[]>;
  findPrice: (sku: string, store: string) => Promise<PriceEntity>;
  savePrices: (data: PriceEntity | PriceEntity[]) => Promise<void>;
  findPcByStartdate: (startdate: string) => Promise<PricechangeEntity[]>;
  updateAppliedList: (data: any[]) => Promise<void>;
}
