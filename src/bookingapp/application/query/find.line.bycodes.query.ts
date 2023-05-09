import { IQuery } from '@nestjs/cqrs';

export class FindLineByCodesQuery implements IQuery {
  constructor(readonly codes: string[]) {}
}
