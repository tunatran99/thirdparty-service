export interface CategoryQuery {
  find: (search?: string, offset?: number, limit?: number) => Promise<any>;
  selectStoreRecords: (id: string) => Promise<any>;
  selectCateRecords: (cates: string[], store: string) => Promise<any>;
}
