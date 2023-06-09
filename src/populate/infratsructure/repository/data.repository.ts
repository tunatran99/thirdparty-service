import { MenuEntity } from '../entity/menu';

export interface DataRepository {
  save: (data: MenuEntity | MenuEntity[]) => Promise<MenuEntity[]>;
}
