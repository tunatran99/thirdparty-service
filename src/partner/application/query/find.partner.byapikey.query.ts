import { IQuery } from '@nestjs/cqrs';

export class FindPartnerByApikeyQuery implements IQuery {
  constructor(readonly apikey: string) {}
}
