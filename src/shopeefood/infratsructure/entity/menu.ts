import { BaseEntity } from 'libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'spf_menu', synchronize: true })
export class MenuEntity extends BaseEntity {
  @Column({ nullable: true })
  CATEGORY?: string;
  @Column({ nullable: true })
  SKU?: string;
  @Column({ nullable: true })
  STORE?: string;
  @Column({ nullable: true })
  DESCRIPTION?: string;
  @Column({ nullable: true })
  STATUS?: number;
  @Column({ nullable: true })
  SKU_IMAGE?: string;
  @Column({ nullable: true })
  SEQUENCE?: number;
}
