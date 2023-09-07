import { BaseEntity } from '@libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'thirdparty_category', synchronize: false })
export class CategoryEntity extends BaseEntity {
  @Column()
  CATEGORY_CODE: string;
  @Column()
  CATEGORY_NAME: string;
  @Column()
  SEQUENCE: number;
  @Column()
  ACTIVE: string;
  @Column()
  ANCESTOR: string;
}
