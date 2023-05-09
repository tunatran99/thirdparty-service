import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSupplierByCodesQuery } from '../query/find.supplier.bycodes.query';
import { Inject } from '@nestjs/common';
import { SupplierQueryImplement } from 'src/bookingapp/infratsructure/query/supplier.query.implement';
import { SupplierFoundByCodesEvent } from '../event/supplier.found.bycodes';

@QueryHandler(FindSupplierByCodesQuery)
export class FindSupplierByCodesQueryHandler implements IQueryHandler<FindSupplierByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly supplierQuery: SupplierQueryImplement;

  async execute(command: FindSupplierByCodesQuery): Promise<void> {
    const data = await this.supplierQuery.findByCodes(command.codes);
    this.eventBus.publish(new SupplierFoundByCodesEvent(data));
  }
}
