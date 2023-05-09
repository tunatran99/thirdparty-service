import { IQuery } from '@nestjs/cqrs';

export class FindApikeyByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
