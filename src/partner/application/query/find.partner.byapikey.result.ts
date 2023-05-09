import { IQueryResult } from '@nestjs/cqrs';

export class FindPartnerByApikeyResult implements IQueryResult {
  readonly id: number;
  readonly name: string;

  readonly isDisabled: boolean;

  readonly ipWhitelists: string[];
}
