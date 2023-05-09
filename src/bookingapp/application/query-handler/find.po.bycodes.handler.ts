import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPOByCodesQuery } from '../query/find.po.bycodes.query';
import { Inject } from '@nestjs/common';
import { POQueryImplement } from 'src/bookingapp/infratsructure/query/po.query.implement';
import { POFoundByCodesEvent } from '../event/po.found.bycodes';

@QueryHandler(FindPOByCodesQuery)
export class FindPOByCodesQueryHandler implements IQueryHandler<FindPOByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly poQuery: POQueryImplement;

  async execute(command: FindPOByCodesQuery): Promise<void> {
    const data = await this.poQuery.findByCodes(command.codes);
    this.eventBus.publish(new POFoundByCodesEvent(data));
  }
}
