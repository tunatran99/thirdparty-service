import { IQueryResult } from '@nestjs/cqrs';

export class FindItemByCodesResult implements IQueryResult {
  constructor(
    readonly items: Readonly<{
      store: string;
      sku: string;
    }>[],
  ) {}
}
