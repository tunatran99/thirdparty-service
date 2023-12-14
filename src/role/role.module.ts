import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddRoleHandler } from './application/command-handler/add.role.handler';
import { DeleteRoleHandler } from './application/command-handler/delete.role.handler';
import { UpdateRoleHandler } from './application/command-handler/update.role.handler';
import { FindPermissionHandler } from './application/query-handler/find.permission.handler';
import { FindRoleByCodeHandler } from './application/query-handler/find.role.by.code.handler';
import { RoleFactory } from './domain/role.factory';
import { PermissionQueryImplement } from './infratsructure/query/permission.query.implement';
import { RoleQueryImplement } from './infratsructure/query/role.query.implement';
import { RoleRepositoryImplement } from './infratsructure/repository/role.repository.implement';
import { RoleController } from './presentation/role.controller';

const infrastructure = [RoleRepositoryImplement, RoleQueryImplement, PermissionQueryImplement];

const application = [
  AddRoleHandler,
  DeleteRoleHandler,
  UpdateRoleHandler,
  FindRoleByCodeHandler,
  FindPermissionHandler
];

const domain = [RoleFactory];

@Module({
  imports: [CqrsModule],
  controllers: [RoleController],
  providers: [...infrastructure, ...application, ...domain],
})
export class RoleModule {}
