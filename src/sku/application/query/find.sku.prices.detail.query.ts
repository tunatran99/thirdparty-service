import { IQuery } from '@nestjs/cqrs';

export class FindSkuPricesDetailQuery implements IQuery {
  constructor(readonly partnerId: number, readonly sku: string) {}
}
