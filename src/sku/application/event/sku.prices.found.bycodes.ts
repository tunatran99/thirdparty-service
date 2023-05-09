import { IEvent } from '@nestjs/cqrs';

export class SkuPricesFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: { sku: string; store: string; partnerId: number }[]) {}
}
