import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCategoryByCodesTestQuery } from '../query/find.category.bycodes.test.query';
import { Inject } from '@nestjs/common';
import { CategoryQueryImplement } from 'src/shopeefood/infratsructure/query/category.query.implement';
import { FindCategoryByCodesResult } from '../query/find.category.bycodes.result';

@QueryHandler(FindCategoryByCodesTestQuery)
export class FindCategoryByCodesTestQueryHandler implements IQueryHandler<FindCategoryByCodesTestQuery, FindCategoryByCodesResult> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly categoryQuery: CategoryQueryImplement;

  async execute(command: FindCategoryByCodesTestQuery): Promise<FindCategoryByCodesResult> {
    const data = await this.categoryQuery.selectStoreTestRecords(command.id);
    return data;
  }
}
