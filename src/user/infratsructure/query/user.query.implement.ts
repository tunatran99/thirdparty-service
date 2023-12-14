import { UserQuery } from './user.query';
import { UserEntity } from '../entity/user';
import { readConnection } from '@libs/database.module';
import { Brackets } from 'typeorm/query-builder/Brackets';

export class UserQueryImplement implements UserQuery {
  async findAll(search?: string, offset?: number, limit?: number): Promise<any> {
    let sql = readConnection.getRepository(UserEntity).createQueryBuilder('t1')
      .leftJoinAndSelect('t1.roles', 't2')
      .offset(offset)
      .limit(limit)
      .orderBy('t1.createdAt', 'DESC');
    if (search) {
      sql = sql.andWhere(
        new Brackets((qb) => {
          qb.where('t1.username LIKE :search', {
            search: `%${search}%`,
          });
          qb.orWhere('t1.fullname LIKE :search', {
            search: `%${search}%`,
          });
          qb.orWhere('t1.email LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    const [items, total] = await sql.getManyAndCount();
    return { items, total };
  }
  async findProfileById(id: number): Promise<UserEntity> {
    return readConnection.getRepository(UserEntity).createQueryBuilder('t1').where('t1.id = :id', { id }).getOne();
  }
  async findIdByUsername(username: string): Promise<number> {
    const user = await readConnection.getRepository(UserEntity).createQueryBuilder('t1')
      .where('t1.username = :username', { username })
      .getOne();

    return user.id;
  }
}
