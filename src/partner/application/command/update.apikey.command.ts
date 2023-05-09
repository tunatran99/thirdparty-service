import { ICommand } from '@nestjs/cqrs';

export class UpdateApikeyCommand implements ICommand {
  constructor(readonly id: number, readonly key: string, readonly description: string) {}
}
