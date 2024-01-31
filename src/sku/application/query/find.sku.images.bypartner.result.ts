import { IQueryResult } from '@nestjs/cqrs';

export class FindSkuImagesByPartnerResult implements IQueryResult {
  readonly items: Readonly<{
    readonly id: string;
    readonly sku: string;
    readonly png: string;
    readonly jpg: string;
  }>[];
  readonly total: number;
}
