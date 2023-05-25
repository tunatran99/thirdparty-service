import { IQuery } from '@nestjs/cqrs';

export class FindCategoryByCodesQuery implements IQuery {
  constructor(readonly id: number) {}
}
