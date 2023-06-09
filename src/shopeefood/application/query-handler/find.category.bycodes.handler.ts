import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryByCodesQuery } from '../query/find.category.bycodes.query';
import { Inject } from '@nestjs/common';
import { CategoryQueryImplement } from 'src/shopeefood/infratsructure/query/category.query.implement';
import { FindCategoryByCodesResult } from '../query/find.category.bycodes.result';

@QueryHandler(FindCategoryByCodesQuery)
export class FindCategoryByCodesQueryHandler implements IQueryHandler<FindCategoryByCodesQuery, FindCategoryByCodesResult> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly categoryQuery: CategoryQueryImplement;

  async execute(command: FindCategoryByCodesQuery): Promise<FindCategoryByCodesResult> {
    const data = await this.categoryQuery.selectStoreRecords(command.id);
    return data;
  }
}
