import { IQueryResult } from '@nestjs/cqrs';
import { ApikeyEntity } from 'src/partner/infratsructure/entity/apikey';
import { IpWhitelistEntity } from 'src/partner/infratsructure/entity/ipwhitelist';

export class FindPartnerResult implements IQueryResult {
  constructor(
    readonly items: Readonly<{
      id: number;
      name: string;

      isDisabled: boolean;
      createdAt: Date;
      updatedAt: Date;

      readonly apikeys: ApikeyEntity[];
      readonly ipWhitelists: IpWhitelistEntity[];
    }>[],
  ) {}
}
