import { FindCategoryByCodesResult } from 'src/shopeefood/application/query/find.category.bycodes.result';
import { CategoryEntity } from '../entity/category';

export interface CategoryQuery {
  selectStoreRecords: (id: number) => Promise<FindCategoryByCodesResult>;
  selectCateRecords: (cates: string[]) => Promise<any>;
}
