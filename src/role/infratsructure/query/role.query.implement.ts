import { readConnection } from 'libs/database.module';
import { FindRoleByCodeResult } from 'src/role/application/query/find.role.by.code.query.result';
import { Brackets } from 'typeorm';
import { RoleEntity } from '../entity/role';
import { RoleQuery } from './role.query';

export class RoleQueryImplement implements RoleQuery {
  async findRoleByCode(search?: string, offset?: number, limit?: number): Promise<FindRoleByCodeResult> {
    let sql = readConnection.getRepository(RoleEntity).createQueryBuilder('t1')
    .leftJoinAndSelect('t1.permissions', 't2')
    .leftJoinAndSelect('t1.users', 't3')
    // .offset(offset).limit(limit)

    if (search) {
      sql = sql.andWhere(new Brackets((qb) => qb.where('t1.code LIKE :search', { search: `%${search}%` })));
    }

    const [items, total] = await sql.getManyAndCount();

    return { items, total };
  }
}