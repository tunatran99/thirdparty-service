import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { addRole } from '../application/command/add.role.command';
import { deleteRole } from '../application/command/delete.role.command';
import { UpdateRole } from '../application/command/update.role.command';
import { FindPermisson } from '../application/query/find.permission.query';
import { FindRoleByCode } from '../application/query/find.role.by.code.query';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { findRoleDTO } from './dto/find.role.dto';
import { roleDTO } from './dto/role.dto';

@Controller('role')
export class RoleController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}
  @Post('add')
  async addRole(@Body() body: roleDTO): Promise<void> {
    const command = new addRole(body.code, body.permissions, body.desc);
    await this.commandBus.execute(command);
  }

  @Post('update')
  @UseGuards(JwtAuthenticationGuard)
  async updateRole(@Body() body: roleDTO) {
    const command = new UpdateRole(body.id, body.permissions, body.desc);
    await this.commandBus.execute(command);
  }

  @Get()
  async findRole(@Query() params: findRoleDTO) {
    const query = new FindRoleByCode(params.search, params.offset, params.limit);
    return await this.queryBus.execute(query);
  }

  @Post('delete')
  async deleteRole(@Body('id') id: number) {
    const command = new deleteRole(id);
    await this.commandBus.execute(command);
  }

  @Get('permission')
  async getAllPermissions() {
    const query = new FindPermisson();
    return await this.queryBus.execute(query);
  }
}
