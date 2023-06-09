import { BaseEntity } from 'libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'ps_menu' })
export class MenuEntity extends BaseEntity {
  @Column({ nullable: true })
  Category_ID: string;
  @Column({ nullable: true })
  Category_Name_Level_1: string;
  @Column({ type: 'text', nullable: true })
  Category_Name_Level_2?: string;
  @Column({ nullable: true })
  Category_Name_Level_3: string;
  @Column({ nullable: true })
  SKU: string;
  @Column({ nullable: true })
  productName?: string;
  @Column({ nullable: true })
  UOM?: string;
  @Column({ nullable: true })
  price?: string;
  @Column({ nullable: true })
  promoPrice?: string;
  @Column({ nullable: true })
  storeId?: string;
  @Column({ nullable: true })
  description?: string;
  @Column({ nullable: true })
  DELETED?: number;
}
