import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'group_pricechange', synchronize: false })
export class GroupPricechangeEntity {
  @PrimaryColumn()
  PRICE_CHANGE_ID?: number;
  @Column()
  PRICE_CHANGE_NO: string;
  @Column()
  TRANS_TYPE: string;
  @Column()
  START_DATE: string;
  @Column()
  START_TIME: string;
  @Column()
  END_DATE: string;
  @Column()
  END_TIME: string;
  @Column()
  CATEGORY: string;
  @Column()
  STORE: string;
  @Column()
  EVENT_ID: string;
  @Column()
  EXCLUDE_SEASON_ID: string;
  @Column()
  PRICE_CHANGE_TYPE: string;
  @Column()
  PRICE_CHANGE_TYPE_VALUE: string;
  @Column()
  REASON: string;
  @Column()
  PROMOTION_TYPE: string;
  @Column()
  STATUS: string;
  @Column()
  CREATED_DATE: string;
  @Column()
  MODIFIED_DATE: string;
  @Column()
  FILE_ID: string;
}
