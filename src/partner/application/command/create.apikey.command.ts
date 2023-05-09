import { ICommand } from '@nestjs/cqrs';

export class CreateApikeyCommand implements ICommand {
  constructor(readonly description: string, readonly partnerId: number) {}
}
