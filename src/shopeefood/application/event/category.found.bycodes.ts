import { IEvent } from '@nestjs/cqrs';
import { FindCategoryByCodesResult } from '../query/find.category.bycodes.result';

export class CategoryFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindCategoryByCodesResult) {}
}
