import { IQueryResult } from '@nestjs/cqrs';

export class FindProductByCodesResult implements IQueryResult {
  constructor(
    readonly items: Readonly<{
      sku_code: string;
      product_name: string;
      product_status: number;
    }>[],
  ) {}
}
