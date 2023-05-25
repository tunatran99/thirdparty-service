import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'category', synchronize: false })
export class CategoryEntity {
  @PrimaryColumn()
  CATEGORY_NUMBER: number;
  @Column()
  CATEGORY_ID: string;
  @Column()
  CATEGORY_NAME: string;
  @Column()
  DEPT_ID: string;
  @Column()
  DELETED: string;
  @Column()
  AUTO_PA: string;
  @Column()
  POS_FLAG: string;
  @Column()
  PWP_EXCLUSION: string;
  @Column()
  AGE_STOCK_RETEN_PERIOD: string;
  @Column()
  MBR_DISC_FLAG: string;
  @Column()
  MBR_DISC_PERC: string;
  @Column()
  MOMMY_DISC_PERC: string;
  @Column()
  HS_CODE: string;
  @Column()
  MSDS_CODE: string;
  @Column()
  GROUP_ID: string;
  @Column()
  DIV_ID: string;
  @Column()
  LINE_ID: string;
  @Column()
  FILE_ID: string;
}
