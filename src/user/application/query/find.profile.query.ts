import { IQuery } from '@nestjs/cqrs';

export class FindProfile implements IQuery {
  constructor(readonly userId: number) {}
}
