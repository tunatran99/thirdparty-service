import { IQuery } from '@nestjs/cqrs';

export class FindItemByCodesQuery implements IQuery {
  constructor(readonly restaurant_id: string) {}
}
