import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindLineByCodesQuery } from '../query/find.line.bycodes.query';
import { Inject } from '@nestjs/common';
import { LineQueryImplement } from 'src/bookingapp/infratsructure/query/line.query.implement';
import { LineFoundByCodesEvent } from '../event/line.found.bycodes';

@QueryHandler(FindLineByCodesQuery)
export class FindLineByCodesQueryHandler implements IQueryHandler<FindLineByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly lineQuery: LineQueryImplement;

  async execute(command: FindLineByCodesQuery): Promise<void> {
    const data = await this.lineQuery.findByCodes(command.codes);
    this.eventBus.publish(new LineFoundByCodesEvent(data));
  }
}
