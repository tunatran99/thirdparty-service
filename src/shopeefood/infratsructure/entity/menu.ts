import { BaseEntity } from 'libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'spf_menu', synchronize: false })
export class MenuEntity extends BaseEntity {
  @Column({ nullable: true })
  CATEGORY_ID?: number;
  @Column({ nullable: true })
  SKU_ID?: number;
  @Column({ nullable: true })
  STORE?: string;
  @Column({ nullable: true })
  DESCRIPTION?: string;
  @Column({ nullable: true })
  STATUS?: boolean;
  @Column({ nullable: true })
  SKU_IMAGE?: string;
  @Column({ nullable: true })
  SEQUENCE?: number;
}
