import { IEvent } from '@nestjs/cqrs';
import { FindProductByCodesResult } from '../query/find.product.bycodes.result';

export class ProductFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindProductByCodesResult) {}
}
