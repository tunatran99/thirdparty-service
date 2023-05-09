import { IQuery } from '@nestjs/cqrs';

export class FindProductByCodesQuery implements IQuery {
  constructor(readonly codes: string[]) {}
}
