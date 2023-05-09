import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPartnerQuery } from '../query/find.partner.query';
import { Inject } from '@nestjs/common';
import { PartnerQueryImplement } from 'src/partner/infratsructure/query/partner.query.implement';
import { FindPartnerResult } from '../query/find.partner.result';

@QueryHandler(FindPartnerQuery)
export class FindPartnerQueryHandler implements IQueryHandler<FindPartnerQuery, FindPartnerResult> {
  @Inject()
  private readonly partnerQuery: PartnerQueryImplement;

  async execute(command: FindPartnerQuery): Promise<FindPartnerResult> {
    const data = await this.partnerQuery.find(command);
    return data;
  }
}
