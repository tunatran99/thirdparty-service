import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ItemSellPriceEntity } from './item_sell_price';
import { PricechangeEntity } from './price_change';

@Entity({ name: 'sku', synchronize: false })
export class SkuEntity {
  @PrimaryColumn()
  SKU_ID?: number;
  @Column()
  SKU_CODE?: string;
  @Column()
  ITEM_DESC_VNM: string;
  @Column()
  PACK_ITEM: string;
  @Column()
  PERISH_ITEM: string;
  @Column()
  NON_INVENTORY: string;
  @Column()
  NON_PLU: string;
  @Column()
  MOMMY_ITEM: string;
  @Column()
  FOOD_ITEM: string;
  @Column()
  MEMBER_DISC_ITEM: string;
  @Column()
  SUPER_SAVER_ITEM: string;
  @Column()
  AUTO_REPLENISH_ITEM: string;
  @Column()
  PURCHASE_METHOD: string;
  @Column()
  LINE_ID: string;
  @Column()
  DIVISION_ID: string;
  @Column()
  GROUP_ID: string;
  @Column()
  DEPT_ID: string;
  @Column()
  CATEGORY_ID: string;
  @Column()
  SUB_CATEGORY: string;
  @Column()
  COLOUR_SIZE_GRID: string;
  @Column()
  COLOUR: string;
  @Column()
  SIZE_ID: string;
  @Column()
  POP1_DESC_VNM: string;
  @Column()
  POP2_DESC_VNM: string;
  @Column()
  POP3_DESC_VNM: string;
  @Column()
  SELLING_POINT1: string;
  @Column()
  SELLING_POINT2: string;
  @Column()
  SELLING_POINT3: string;
  @Column()
  SELLING_POINT4: string;
  @Column()
  SELLING_POINT5: string;
  @Column({ nullable: true })
  ITEM_SELL_PRICE?: string;
  @Column()
  RETAIL_UOM: string;
  @Column()
  STATUS: string;
  @Column()
  ACTIVED: string;
  @Column()
  DELETED: string;
  @Column()
  DATE_CREATE: string;
  @Column()
  MODIFIED_DATE: string;
  @Column()
  FILE_ID: string;

  itemSellPrices: ItemSellPriceEntity[];
  pricechanges: PricechangeEntity[];
  stores: string[];
}
