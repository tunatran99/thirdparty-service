import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindItemByCodesQuery } from '../query/find.item.bycodes.query';
import { Inject } from '@nestjs/common';
import { ItemQueryImplement } from 'src/shopeefood/infratsructure/query/item.query.implement';
import { ItemFoundByCodesEvent } from '../event/item.found.bycodes';

@QueryHandler(FindItemByCodesQuery)
export class FindItemByCodesQueryHandler implements IQueryHandler<FindItemByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly itemQuery: ItemQueryImplement;

  async execute(command: FindItemByCodesQuery): Promise<void> {
    const data = await this.itemQuery.findByCodes(command.restaurant_id);
    // this.eventBus.publish(new ItemFoundByCodesEvent(data));
  }
}
