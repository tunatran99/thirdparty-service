import { IQuery } from '@nestjs/cqrs';

export class FindSkuPricesByPartnerQuery implements IQuery {
  public readonly search?: string;
  public readonly offset?: number;
  public readonly limit?: number;
  public readonly partnerId: number;
  public readonly storeId?: string;

  constructor(readonly data: Partial<FindSkuPricesByPartnerQuery>) {
    Object.assign(this, data);
  }
}
