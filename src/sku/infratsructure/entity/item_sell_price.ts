import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'item_sell_price', synchronize: false })
export class ItemSellPriceEntity {
  @PrimaryColumn()
  ITEMSELLPRICE_CODE?: number;
  @Column()
  STORE: string;
  @Column()
  SKU: string;
  @Column()
  DESCRIPTION: string;
  @Column()
  CURRENT_PRICE: string;
  @Column()
  PROMOTION_FLAG: string;
  @Column()
  PROMOTION_RETAIL: string;
  @Column()
  MEMBER_RETAIL: string;
  @Column()
  MEMBER_PROMOTION_FLAG: string;
  @Column()
  MEMBER_PROMOTION_RETAIL: string;
  @Column()
  FILE_ID: string;
}
