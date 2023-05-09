import { IQuery } from '@nestjs/cqrs';

export class FindPOByCodesQuery implements IQuery {
  constructor(readonly codes: string[]) {}
}
