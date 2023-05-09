import { IEvent } from '@nestjs/cqrs';
import { FindSupplierByCodesResult } from '../query/find.supplier.bycodes.result';

export class SupplierFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindSupplierByCodesResult) {}
}
