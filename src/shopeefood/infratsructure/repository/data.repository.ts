import { MenuEntity } from '../entity/menu';

export interface DataRepository {
  save: (data: MenuEntity | MenuEntity[]) => Promise<MenuEntity[]>;
  findCategoryIdByCode: (code: string) => Promise<number>;
  findSkuIdByCode: (code: string) => Promise<number>;
  findStoreIdByCode: (code: string) => Promise<number>;
}
