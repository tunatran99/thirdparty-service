import { ICommand } from '@nestjs/cqrs';

export class UpdatePartnerCommand implements ICommand {
  constructor(readonly id: number, readonly name: string) {}
}
