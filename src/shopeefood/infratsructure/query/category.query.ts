import { FindCategoryByCodesResult } from 'src/shopeefood/application/query/find.category.bycodes.result';

export interface CategoryQuery {
  selectSomeRecords: (id: number) => Promise<FindCategoryByCodesResult>;
}
