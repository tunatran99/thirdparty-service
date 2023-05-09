import { ICommand } from '@nestjs/cqrs';

export class createUser implements ICommand {
  constructor(
    readonly username: string,
    readonly password: string,
    readonly fullname?: string,
    readonly email?: string,
  ) {}
}
