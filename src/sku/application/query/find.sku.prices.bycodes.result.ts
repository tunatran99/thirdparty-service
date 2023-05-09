import { IQueryResult } from '@nestjs/cqrs';

type data = Readonly<{
  success: any[];
  error: any[];
}>;

export class FindSkuPricesByCodesResult implements IQueryResult {
  readonly status: string;
  readonly message: string;
  readonly data: data;
}
