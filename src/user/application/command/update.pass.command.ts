import { ICommand } from '@nestjs/cqrs';

export class UpdateUserPass implements ICommand {
  readonly id: number;
  readonly currentPassword?: string;
  readonly newPassword?: string;

  constructor(readonly data: Partial<UpdateUserPass>) {
    Object.assign(this, data);
  }
}
