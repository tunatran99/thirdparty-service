import { BaseEntity } from '@libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category_sequence', synchronize: true })
export class CategoryEntity extends BaseEntity {
  @Column()
  CATEGORY_CODE: string;
  @Column()
  SEQUENCE: number;
}
