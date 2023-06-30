export interface CategoryQuery {
  selectStoreRecords: (id: number) => Promise<any>;
  selectCateRecords: (cates: string[], store: number) => Promise<any>;
}
