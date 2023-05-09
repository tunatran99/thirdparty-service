import { IQuery } from '@nestjs/cqrs';

export class FindLogQuery implements IQuery {
  public readonly search?: string;
  public readonly offset?: number;
  public readonly limit?: number;

  constructor(readonly data: Partial<FindLogQuery>) {
    Object.assign(this, data);
  }
}
