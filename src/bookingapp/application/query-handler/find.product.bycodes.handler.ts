import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductByCodesQuery } from '../query/find.product.bycodes.query';
import { Inject } from '@nestjs/common';
import { ProductQueryImplement } from 'src/bookingapp/infratsructure/query/product.query.implement';
import { ProductFoundByCodesEvent } from '../event/product.found.bycodes';

@QueryHandler(FindProductByCodesQuery)
export class FindProductByCodesQueryHandler implements IQueryHandler<FindProductByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly productQuery: ProductQueryImplement;

  async execute(command: FindProductByCodesQuery): Promise<void> {
    const data = await this.productQuery.findByCodes(command.codes);
    this.eventBus.publish(new ProductFoundByCodesEvent(data));
  }
}
