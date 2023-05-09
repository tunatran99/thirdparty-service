import { ICommand } from '@nestjs/cqrs';

export class ChangeStatusPartnerCommand implements ICommand {
  constructor(readonly id: number) {}
}
