import { IRole } from 'src/role/domain/role';
import { RoleEntity } from '../entity/role';

export interface RoleRepository {
  save: (configdata: IRole | IRole[]) => Promise<void>;
  remove: (id: number) => Promise<void>;
  findById: (id: number) => Promise<Record<string, RoleEntity | IRole> | null>;
}
