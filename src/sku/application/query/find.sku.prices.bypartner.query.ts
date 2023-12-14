import { IQuery } from '@nestjs/cqrs';

export class FindSkuPricesByPartnerQuery implements IQuery {
  public readonly search?: string;
  public readonly offset?: number;
  public readonly limit?: number;
  public readonly partnerId: number;
  public readonly storeId?: string[];
  public readonly lineId?: string;
  public readonly groupId?: string;
  public readonly deptId?: string;
  public readonly cateId?: string;
  public readonly hasPromo?: string;
  public readonly export?: boolean;
  public readonly fromDate?: string;
  public readonly toDate?: string;

  constructor(readonly data: Partial<FindSkuPricesByPartnerQuery>) {
    Object.assign(this, data);
  }
}
