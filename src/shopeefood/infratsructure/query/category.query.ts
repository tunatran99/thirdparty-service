export interface CategoryQuery {
  selectStoreRecords: (id: string) => Promise<any>;
  selectStoreTestRecords: (id: string) => Promise<any>;
  selectCateRecords: (cates: string[], store: string) => Promise<any>;
  selectCateTestRecords: (cates: string[], store: string) => Promise<any>;
}
