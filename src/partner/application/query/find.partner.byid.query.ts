import { IQuery } from '@nestjs/cqrs';

export class FindPartnerByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
