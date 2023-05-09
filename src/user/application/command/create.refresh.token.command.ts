import { ICommand } from '@nestjs/cqrs';

export class createRefreshToken implements ICommand {
  constructor(readonly userId: number, readonly tokenId: string) {}
}
