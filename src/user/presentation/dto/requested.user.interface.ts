import { Request } from 'express';
import { RoleEntity } from 'src/role/infratsructure/entity/role';

type RequestedUserProperties = Readonly<{
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  email: string;
  isDisabled: boolean;
  version: number;
  loginId: string;
  storeId: string;
  partnerId: string;
  roles: RoleEntity[];
}>;

const listProp = ['id', 'username', 'fullname', 'avatar', 'email', 'isDisabled', 'version', 'loginId', 'storeId', 'partnerId', 'roles'];

export class RequestedUser implements RequestedUserProperties {
  readonly id: number;
  readonly username: string;
  readonly fullname: string;
  readonly avatar: string;
  readonly email: string;
  readonly isDisabled: boolean;
  readonly version: number;
  readonly loginId: string;
  readonly storeId: string;
  readonly partnerId: string;
  readonly roles: RoleEntity[];

  constructor(properties: Partial<RequestedUserProperties>) {
    listProp.forEach((prop) => (this[prop] = properties[prop]));
  }
}

export interface RequestWithUser extends Request {
  user: RequestedUser;
}
