import { BaseEntity } from '@libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'spf_category', synchronize: true })
export class CategoryEntity extends BaseEntity {
  @Column()
  CATEGORY_CODE: string;
  @Column()
  CATEGORY_NAME: string;
  @Column()
  STATUS: number;
  @Column()
  SEQUENCE: number;
}
