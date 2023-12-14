import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MasterdataQueryImplement } from 'src/masterdata/infratsructure/query/masterdata.query.implement';
import {
  FindPartner,
  FindRole, FindStore
} from '../query/find.masterdata.query';

@QueryHandler(FindRole)
export class FindRoleHandler implements IQueryHandler<FindRole, any> {
  @Inject()
  private readonly masterdataQuery: MasterdataQueryImplement;

  async execute(): Promise<any> {
    return await this.masterdataQuery.findRole();
  }
}

@QueryHandler(FindStore)
export class FindStoreHandler implements IQueryHandler<FindStore, any> {
  @Inject()
  private readonly masterdataQuery: MasterdataQueryImplement;

  async execute(): Promise<any> {
    return await this.masterdataQuery.findStore();
  }
}

@QueryHandler(FindPartner)
export class FindPartnerHandler implements IQueryHandler<FindPartner, any> {
  @Inject()
  private readonly masterdataQuery: MasterdataQueryImplement;

  async execute(): Promise<any> {
    return await this.masterdataQuery.findPartner();
  }
}