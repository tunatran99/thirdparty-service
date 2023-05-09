import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'supplier', synchronize: false })
export class SupplierEntity {
  @PrimaryColumn()
  ITEM_ID: number;
  @Column()
  SUPPLIER_CODE: string;
  @Column()
  SUPPLIER_NAME_END: string;
  @Column()
  SUPPLIER_NAME_VNM: string;
  @Column()
  SUPPLIER_SHORTNAME_END: string;
  @Column()
  SUPPLIER_SHORTNAME_VNM: string;
  @Column()
  SUPPLIER_TYPE: string;
  @Column()
  PHONE_NUMBER: string;
  @Column()
  EMAIL_ADDRESS: string;
  @Column()
  DELETE_FLAG: string;
  @Column()
  FILE_ID: string;
}
