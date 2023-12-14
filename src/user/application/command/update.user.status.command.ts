import { ICommand } from '@nestjs/cqrs';

export class UpdateUserStatus implements ICommand {
  constructor(readonly id: number) {}
}
