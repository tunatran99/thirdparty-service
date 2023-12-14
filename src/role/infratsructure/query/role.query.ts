import { FindRoleByCodeResult } from 'src/role/application/query/find.role.by.code.query.result';

export interface RoleQuery {
  findRoleByCode: (search?: string, offset?: number, limit?: number) => Promise<FindRoleByCodeResult>;
}
