import { IQuery } from '@nestjs/cqrs';

export class FindAll implements IQuery {
  constructor(readonly search?: string, readonly offset?: number, readonly limit?: number) {}
}
