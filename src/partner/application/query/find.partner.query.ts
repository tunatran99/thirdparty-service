import { IQuery } from '@nestjs/cqrs';

export class FindPartnerQuery implements IQuery {
  readonly search?: string;
  readonly offset?: number;
  readonly limit?: number;

  constructor(options: FindPartnerQuery) {
    Object.assign(this, options);
  }
}
