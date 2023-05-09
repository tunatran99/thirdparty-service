import { ICommand } from '@nestjs/cqrs';

export class DeleteApikeyCommand implements ICommand {
  constructor(readonly id: number) {}
}
