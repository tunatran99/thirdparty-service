import { IQuery } from '@nestjs/cqrs';

export class FindRoleByCode implements IQuery {
  constructor(readonly search?: string, readonly offset?: number, readonly limit?: number) {}
}
