import { IData } from 'src/shopeefood/domain/data';
import { MenuEntity } from '../entity/menu';

export interface DataRepository {
  save: (data: IData | IData[]) => Promise<MenuEntity[]>;
  findBySkuId: (skuId: number, store: string) => Promise<Record<string, MenuEntity | IData> | null>;
  findCategoryIdByCode: (code: string) => Promise<number>;
  findSkuIdByCode: (code: string) => Promise<number>;
  findStoreIdByCode: (code: string) => Promise<number>;
}
