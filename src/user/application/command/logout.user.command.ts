import { ICommand } from '@nestjs/cqrs';

export class logoutUser implements ICommand {
  constructor(readonly userId: number, readonly tokenId: string) {}
}
