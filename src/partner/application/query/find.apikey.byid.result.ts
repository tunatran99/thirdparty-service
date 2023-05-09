import { IQueryResult } from '@nestjs/cqrs';

export class FindApikeyByIdResult implements IQueryResult {
  readonly id: number;
  readonly key: string;
  readonly description: string;

  readonly isDisabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
