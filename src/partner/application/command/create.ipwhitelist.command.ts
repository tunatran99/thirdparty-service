import { ICommand } from '@nestjs/cqrs';

export class CreateIpWhitelistCommand implements ICommand {
  constructor(readonly ip: string, readonly description: string, readonly partnerId: number) {}
}
