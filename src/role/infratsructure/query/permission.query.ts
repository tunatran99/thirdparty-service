import { PermissionEntity } from '../entity/permission';

export interface PermissionQuery {
  findAll: () => Promise<PermissionEntity[]>;
}
