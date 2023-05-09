import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindApikeyByIdQuery } from '../query/find.apikey.byid.query';
import { Inject } from '@nestjs/common';
import { ApikeyQueryImplement } from 'src/partner/infratsructure/query/apikey.query.implement';
import { FindApikeyByIdResult } from '../query/find.apikey.byid.result';

@QueryHandler(FindApikeyByIdQuery)
export class FindApikeyByIdQueryHandler implements IQueryHandler<FindApikeyByIdQuery, FindApikeyByIdResult> {
  @Inject()
  private readonly apikeyQuery: ApikeyQueryImplement;

  async execute(command: FindApikeyByIdQuery): Promise<FindApikeyByIdResult> {
    const data = await this.apikeyQuery.findById(command.id);
    return data;
  }
}
