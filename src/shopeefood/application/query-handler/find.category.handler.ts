import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryQuery } from '../query/find.category.query';
import { Inject } from '@nestjs/common';
import { CategoryQueryImplement } from 'src/shopeefood/infratsructure/query/category.query.implement';
import { FindCategoryByCodesResult } from '../query/find.category.bycodes.result';

@QueryHandler(FindCategoryQuery)
export class FindCategoryQueryHandler implements IQueryHandler<FindCategoryQuery, any> {
  constructor() {}

  @Inject()
  private readonly categoryQuery: CategoryQueryImplement;

  async execute(command: FindCategoryQuery): Promise<any> {
    const data = await this.categoryQuery.find(command.q.search, command.q.offset, command.q.limit);
    return data;
  }
}
