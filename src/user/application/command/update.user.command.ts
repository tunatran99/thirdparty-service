import { ICommand } from '@nestjs/cqrs';

export class UpdateUser implements ICommand {
  readonly id: number;
  readonly roles?: any;
  readonly fullname?: string;
  readonly email?: string;
  readonly avatar?: string;
  readonly currentPassword?: string;
  readonly newPassword?: string;
  readonly storeId?: string[];
  readonly partnerId?: number[];

  constructor(readonly data: Partial<UpdateUser>) {
    Object.assign(this, data);
  }
}
