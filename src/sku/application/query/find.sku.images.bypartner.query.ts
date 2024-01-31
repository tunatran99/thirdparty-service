import { IQuery } from '@nestjs/cqrs';

export class FindSkuImagesByPartnerQuery implements IQuery {
  public readonly search?: string;
  public readonly offset?: number;
  public readonly limit?: number;
  public readonly partnerId: number;

  constructor(readonly data: Partial<FindSkuImagesByPartnerQuery>) {
    Object.assign(this, data);
  }
}
