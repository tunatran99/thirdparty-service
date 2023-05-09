import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindIpWhitelistByIdQuery } from '../query/find.ipwhitelist.byid.query';
import { Inject } from '@nestjs/common';
import { IpWhitelistQueryImplement } from 'src/partner/infratsructure/query/ipwhitelist.query.implement';
import { FindIpWhitelistByIdResult } from '../query/find.ipwhitelist.byid.result';

@QueryHandler(FindIpWhitelistByIdQuery)
export class FindIpWhitelistByIdQueryHandler
  implements IQueryHandler<FindIpWhitelistByIdQuery, FindIpWhitelistByIdResult>
{
  @Inject()
  private readonly ipwhitelistQuery: IpWhitelistQueryImplement;

  async execute(command: FindIpWhitelistByIdQuery): Promise<FindIpWhitelistByIdResult> {
    const data = await this.ipwhitelistQuery.findById(command.id);
    return data;
  }
}
