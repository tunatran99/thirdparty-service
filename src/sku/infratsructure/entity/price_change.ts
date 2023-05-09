import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pricechange', synchronize: false })
export class PricechangeEntity {
  @PrimaryColumn()
  PRICE_ID?: number;
  @Column()
  PRICE_CHANGE_NO: string;
  @Column()
  DEPARTMENT: string;
  @Column()
  TRANS_TYPE: string;
  @Column()
  REASON: string;
  @Column()
  EVENT_ID: string;
  @Column()
  PRICE_CHANGE_TYPE: string;
  @Column()
  PRICE_CHANGE_TYPE_VALUE: string;
  @Column()
  PROMOTION_TYPE: string;
  @Column()
  START_DATE: string;
  @Column()
  DAILY_START_TIME: string;
  @Column()
  END_DATE: string;
  @Column()
  DAILY_END_TIME: string;
  @Column()
  STATUS: string;
  @Column()
  STORE: string;
  @Column()
  SKU: string;
  @Column()
  LAST_SELL_PRICE: string;
  @Column()
  LAST_SELL_UNIT: string;
  @Column()
  NEW_SELL_PRICE: string;
  @Column()
  CREATED_DATE: string;
  @Column()
  MODIFIED_DATE: string;
  @Column()
  FILE_ID: string;
}
