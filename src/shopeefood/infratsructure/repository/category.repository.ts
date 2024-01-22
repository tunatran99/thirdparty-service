import { ICategory } from 'src/shopeefood/domain/category';
import { CategoryEntity } from '../entity/category';

export interface CategoryRepository {
  save: (data: ICategory | ICategory[]) => Promise<CategoryEntity[]>;
}
