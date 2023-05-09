import { ICommand } from '@nestjs/cqrs';

export class CreatePartnerCommand implements ICommand {
  constructor(readonly name: string) {}
}
