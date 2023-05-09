import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPartnerByApikeyQuery } from '../query/find.partner.byapikey.query';
import { Inject } from '@nestjs/common';
import { PartnerQueryImplement } from 'src/partner/infratsructure/query/partner.query.implement';
import { FindPartnerByApikeyResult } from '../query/find.partner.byapikey.result';

@QueryHandler(FindPartnerByApikeyQuery)
export class FindPartnerByApikeyQueryHandler
  implements IQueryHandler<FindPartnerByApikeyQuery, FindPartnerByApikeyResult>
{
  @Inject()
  private readonly partnerQuery: PartnerQueryImplement;

  async execute(command: FindPartnerByApikeyQuery): Promise<FindPartnerByApikeyResult> {
    const data = await this.partnerQuery.findByApikey(command.apikey);
    return data;
  }
}
