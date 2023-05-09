import { IQuery } from '@nestjs/cqrs';

export class FindSkuPricesByCodesQuery implements IQuery {
  constructor(readonly partnerId: number, readonly codes: string[]) {}
}
