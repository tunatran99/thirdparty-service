import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionQueryImplement } from 'src/role/infratsructure/query/permission.query.implement';
import { FindPermisson } from '../query/find.permission.query';
import { FindPermissionResult } from '../query/find.permission.query.result';

@QueryHandler(FindPermisson)
export class FindPermissionHandler implements IQueryHandler<FindPermisson, FindPermissionResult> {
  @Inject()
  private readonly permissionQuery: PermissionQueryImplement;

  async execute(command: FindPermisson): Promise<FindPermissionResult> {
    const permis = await this.permissionQuery.findAll();
    return permis;
  }
}
