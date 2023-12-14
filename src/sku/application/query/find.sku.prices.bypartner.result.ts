import { IQueryResult } from '@nestjs/cqrs';

export class FindSkuPricesByPartnerResult implements IQueryResult {
  readonly items: Readonly<{
    readonly id: string;
    readonly sku: string;
    readonly productName: string;
    readonly uomEn: string;
    readonly uomVn: string;
    readonly normalPrice: string;
    readonly promotionPrice: string;
    readonly startDate: string;
    readonly endDate: string;
    readonly futurePromotionPrice: string;
    readonly futureStartDate: string;
    readonly futureEndDate: string;
  }>[];
  readonly total: number;
}
