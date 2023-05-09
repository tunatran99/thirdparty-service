import { UserQuery } from './user.query';
import { UserEntity } from '../entity/user';
import { readConnection } from '@libs/database.module';

export class UserQueryImplement implements UserQuery {
  async findProfileById(id: number): Promise<UserEntity> {
    return readConnection.getRepository(UserEntity).createQueryBuilder('t1').where('t1.id = :id', { id }).getOne();
  }
}
