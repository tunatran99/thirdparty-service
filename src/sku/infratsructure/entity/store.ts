import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'store', synchronize: false })
export class StoreEntity {
  @PrimaryColumn()
  STORE_NUMBER: number;
  @Column()
  STORE_ID: string;
  @Column()
  STORE_NAME: string;
  @Column()
  STORE_BU: string;
  @Column()
  STORE_TAX_REG: string;
  @Column()
  STORE_DATE_OPEN: string;
  @Column()
  STORE_REGION: string;
  @Column()
  DELETED: string;
  @Column()
  FILE_ID: string;
}
