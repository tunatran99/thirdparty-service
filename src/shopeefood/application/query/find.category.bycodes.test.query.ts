import { IQuery } from '@nestjs/cqrs';

export class FindCategoryByCodesTestQuery implements IQuery {
  constructor(readonly id: string) {}
}
