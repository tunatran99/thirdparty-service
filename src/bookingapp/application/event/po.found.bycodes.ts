import { IEvent } from '@nestjs/cqrs';
import { FindPOByCodesResult } from '../query/find.po.bycodes.result';

export class POFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindPOByCodesResult) {}
}
