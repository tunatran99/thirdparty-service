import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'purchase_order', synchronize: false })
export class PurchaseOrderEntity {
  @PrimaryColumn()
  PURCHASE_ORDER_ID: number;
  @Column()
  ORDER_NO: string;
  @Column()
  SUPPLIER: string;
  @Column()
  ETA_DATE: string;
  @Column()
  SKU: string;
  @Column()
  BRANCH_CODE: string;
  @Column()
  CONTRACT_NO: string;
  @Column()
  ORDER_QTY: string;
  @Column()
  UNIT_COST_UOM: string;
  @Column()
  FILE_ID: string;
}
