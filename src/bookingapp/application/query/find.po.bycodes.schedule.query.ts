import { IQuery } from '@nestjs/cqrs';

export class FindPOByCodesScheduleQuery implements IQuery {
  constructor(readonly codes: string[]) {}
}
