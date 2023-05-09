import { ICommand } from '@nestjs/cqrs';

export class DeleteIpWhitelistCommand implements ICommand {
  constructor(readonly id: number) {}
}
