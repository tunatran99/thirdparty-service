import { ICommand } from '@nestjs/cqrs';

export class UpdateIpWhitelistCommand implements ICommand {
  constructor(readonly id: number, readonly ip: string, readonly description: string) {}
}
