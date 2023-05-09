import { IQuery } from '@nestjs/cqrs';

export class FindIpWhitelistByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
