import { CommonEntity } from '@libs/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { UserRefreshTokenEntity } from '../infratsructure/entity/refresh.token';
import { RoleEntity } from 'src/role/infratsructure/entity/role';

export type UserEssentialProperties = Readonly<
  Required<{
    username: string;
    password: string;
    fullname: string;
    avatar: string;
    email: string;
    roles: RoleEntity[];

    common: CommonEntity;
  }>
>;

export type UserOptionalProperties = Readonly<
  Partial<{
    id: number;
    storeId: string;
    partnerId: string;
  }>
>;

export type UserProperties = UserEssentialProperties & UserOptionalProperties;

export interface IUser {
  create: () => void;
  update: (data: Partial<UserProperties>) => void;
  commit: () => void;
}

export class UserImplement extends AggregateRoot implements IUser {
  private readonly id: number;
  private readonly username: string;
  private password: string;
  private fullname: string;
  private avatar: string;
  private email: string;
  private storeId: string;
  private partnerId: string;

  private refreshTokens: UserRefreshTokenEntity[];
  private roles: RoleEntity[];

  constructor(properties: UserProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new UserOpenedEvent(this.id, this.email));
  }

  update(data: Partial<UserProperties>): void {
    Object.assign(this, data);
  }
}
