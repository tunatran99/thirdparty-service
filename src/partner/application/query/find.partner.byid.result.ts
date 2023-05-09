import { IQueryResult } from '@nestjs/cqrs';
import { ApikeyEntity } from 'src/partner/infratsructure/entity/apikey';
import { IpWhitelistEntity } from 'src/partner/infratsructure/entity/ipwhitelist';

export class FindPartnerByIdResult implements IQueryResult {
  readonly id: number;
  readonly name: string;

  readonly isDisabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly apikeys: ApikeyEntity[];
  readonly ipWhitelists: IpWhitelistEntity[];
}
