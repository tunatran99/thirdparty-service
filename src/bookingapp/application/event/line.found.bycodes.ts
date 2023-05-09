import { IEvent } from '@nestjs/cqrs';
import { FindLineByCodesResult } from '../query/find.line.bycodes.result';

export class LineFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindLineByCodesResult) {}
}
