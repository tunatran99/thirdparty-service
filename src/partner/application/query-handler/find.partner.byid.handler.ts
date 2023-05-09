import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPartnerByIdQuery } from '../query/find.partner.byid.query';
import { Inject } from '@nestjs/common';
import { PartnerQueryImplement } from 'src/partner/infratsructure/query/partner.query.implement';
import { FindPartnerByIdResult } from '../query/find.partner.byid.result';

@QueryHandler(FindPartnerByIdQuery)
export class FindPartnerByIdQueryHandler implements IQueryHandler<FindPartnerByIdQuery, FindPartnerByIdResult> {
  @Inject()
  private readonly partnerQuery: PartnerQueryImplement;

  async execute(command: FindPartnerByIdQuery): Promise<FindPartnerByIdResult> {
    const data = await this.partnerQuery.findById(command.id);
    return data;
  }
}
