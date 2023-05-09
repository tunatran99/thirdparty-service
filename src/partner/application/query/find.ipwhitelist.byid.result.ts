import { IQueryResult } from '@nestjs/cqrs';

export class FindIpWhitelistByIdResult implements IQueryResult {
  readonly id: number;
  readonly ip: string;
  readonly description: string;

  readonly isDisabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
