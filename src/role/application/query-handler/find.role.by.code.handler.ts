import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleQueryImplement } from 'src/role/infratsructure/query/role.query.implement';
import { FindRoleByCode } from '../query/find.role.by.code.query';
import { FindRoleByCodeResult } from '../query/find.role.by.code.query.result';

@QueryHandler(FindRoleByCode)
export class FindRoleByCodeHandler implements IQueryHandler<FindRoleByCode, FindRoleByCodeResult> {
  @Inject()
  private readonly roleQuery: RoleQueryImplement;

  async execute(command: FindRoleByCode): Promise<FindRoleByCodeResult> {
    const roles = await this.roleQuery.findRoleByCode(command.search, command.offset, command.limit);
    return roles;
  }
}
