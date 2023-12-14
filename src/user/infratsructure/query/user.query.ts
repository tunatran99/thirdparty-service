import { UserEntity } from '../entity/user';

export interface UserQuery {
  findAll: (search?: string, offset?: number, limit?: number) => Promise<any>;
  findProfileById: (id: number) => Promise<UserEntity>;
  findIdByUsername: (username: string) => Promise<number>;
}
