import { IEvent } from '@nestjs/cqrs';
import { FindItemByCodesResult } from '../query/find.item.bycodes.result';

export class ItemFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindItemByCodesResult) {}
}
