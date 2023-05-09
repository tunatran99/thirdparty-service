import { UserEntity } from '../entity/user';

export interface UserQuery {
  findProfileById: (id: number) => Promise<UserEntity>;
}
