import { CategoryEntity } from '../entity/category';

export interface CategoryRepository {
  save: (data: CategoryEntity | CategoryEntity[]) => Promise<CategoryEntity[]>;
}
