import { IQueryResult } from '@nestjs/cqrs';

export class FindLineByCodesResult implements IQueryResult {
  constructor(
    readonly items: Readonly<{
      line_code: string;
      line_name: string;
      line_status: number;
    }>[],
  ) {}
}
