import { Request } from 'express';

type RequestedUserProperties = Readonly<{
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  email: string;
  isDisabled: boolean;
  version: number;
  loginId: string;
}>;

const listProp = ['id', 'username', 'fullname', 'avatar', 'email', 'isDisabled', 'version', 'loginId'];

export class RequestedUser implements RequestedUserProperties {
  readonly id: number;
  readonly username: string;
  readonly fullname: string;
  readonly avatar: string;
  readonly email: string;
  readonly isDisabled: boolean;
  readonly version: number;
  readonly loginId: string;

  constructor(properties: Partial<RequestedUserProperties>) {
    listProp.forEach((prop) => (this[prop] = properties[prop]));
  }
}

export interface RequestWithUser extends Request {
  user: RequestedUser;
}
