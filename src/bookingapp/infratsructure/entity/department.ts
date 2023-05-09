import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'department', synchronize: false })
export class DepartmentEntity {
  @PrimaryColumn()
  DEPT_NUMBER: number;
  @Column()
  DEPT_ID: string;
  @Column()
  DEPT_NAME: string;
  @Column()
  DEPT_TYPE: string;
  @Column()
  PERISHABLE: string;
  @Column()
  COSTING_METHOD: string;
  @Column()
  MATERIAL_FLAG: string;
  @Column()
  REBATE_TYPE: string;
  @Column()
  ORDER_CHKLST_CTRL: string;
  @Column()
  PREFIX: string;
  @Column()
  EXPIRY_DATE_CTRL: string;
  @Column()
  PRINT_ORDER_BOOK: string;
  @Column()
  CDO_DEPT: string;
  @Column()
  MOMMY_CARD_DEPT: string;
  @Column()
  FOOD_CARD_DEPT: string;
  @Column()
  AUTO_REPLENISH_DEPT: string;
  @Column()
  SCHEMATIC_DEPT: string;
  @Column()
  PRINT_REMARK_IN_PO: string;
  @Column()
  PRINT_REMARK_IN_OC: string;
  @Column()
  DLOAD_PO_REMARK_TO_EDI: string;
  @Column()
  INDICATION_IN_ORD_CHKLST: string;
  @Column()
  GROUP_ID: string;
  @Column()
  DIV_ID: string;
  @Column()
  LINE_ID: string;
  @Column()
  DELETED: string;
  @Column()
  FILE_ID: string;
}
