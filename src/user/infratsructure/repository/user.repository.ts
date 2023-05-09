import { IUser } from 'src/user/domain/user';
import { UserEntity } from '../entity/user';

export interface UserRepository {
  save: (configdata: IUser | IUser[]) => Promise<void>;
  findById: (id: number) => Promise<Record<string, UserEntity | IUser> | null>;
  findByUsername: (username: string) => Promise<Record<string, UserEntity | IUser> | null>;
}
