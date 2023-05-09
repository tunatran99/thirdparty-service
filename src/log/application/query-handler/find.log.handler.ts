import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindLogQuery } from '../query/find.log.query';
import { Inject } from '@nestjs/common';
import { FindLogResult } from '../query/find.log.result';
import { LogQueryImplement } from 'src/log/infratsructure/query/log.query.implement';

@QueryHandler(FindLogQuery)
export class FindLogQueryHandler implements IQueryHandler<FindLogQuery, FindLogResult> {
  @Inject()
  private readonly logQuery: LogQueryImplement;

  async execute({ data }: FindLogQuery): Promise<any> {
    const { items, total } = await this.logQuery.find(data.offset, data.limit, data.search);

    return {
      items,
      total,
    };
  }
}
