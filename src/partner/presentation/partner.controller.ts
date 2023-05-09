import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import JwtAuthenticationGuard from 'src/user/authentication/jwt-authentication.guard';
import { ChangeStatusPartnerCommand } from '../application/command/change.status.partner.command';
import { CreateApikeyCommand } from '../application/command/create.apikey.command';
import { CreateIpWhitelistCommand } from '../application/command/create.ipwhitelist.command';
import { CreatePartnerCommand } from '../application/command/create.partner.command';
import { DeleteApikeyCommand } from '../application/command/delete.apikey.command';
import { DeleteIpWhitelistCommand } from '../application/command/delete.ipwhitelist.command';
import { UpdateApikeyCommand } from '../application/command/update.apikey.command';
import { UpdateIpWhitelistCommand } from '../application/command/update.ipwhitelist.command';
import { UpdatePartnerCommand } from '../application/command/update.partner.command';
import { FindApikeyByIdQuery } from '../application/query/find.apikey.byid.query';
import { FindApikeyByIdResult } from '../application/query/find.apikey.byid.result';
import { FindIpWhitelistByIdQuery } from '../application/query/find.ipwhitelist.byid.query';
import { FindIpWhitelistByIdResult } from '../application/query/find.ipwhitelist.byid.result';
import { FindPartnerByIdQuery } from '../application/query/find.partner.byid.query';
import { FindPartnerByIdResult } from '../application/query/find.partner.byid.result';
import { FindPartnerQuery } from '../application/query/find.partner.query';
import { FindPartnerResult } from '../application/query/find.partner.result';
import { createApikeyRequestDTO } from './dto/create.apikey.request.dto';
import { createIpWhitelistRequestDTO } from './dto/create.ipwhitelist.request.dto';
import { createPartnerRequestDTO } from './dto/create.partner.request.dto';
import { findPartnerRequestDTO } from './dto/find.partner.request.dto';
import { updateApikeyRequestDTO } from './dto/update.apikey.request.dto';
import { updateIpWhitelistRequestDTO } from './dto/update.ipwhitelist.request.dto';
import { updatePartnerRequestDTO } from './dto/update.partner.request.dto';

@Controller('partner')
export class PartnerController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findPartner(@Query() query: findPartnerRequestDTO): Promise<FindPartnerResult> {
    return await this.queryBus.execute(new FindPartnerQuery(query));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('add')
  async createPartner(@Body() body: createPartnerRequestDTO): Promise<void> {
    return this.commandBus.execute(new CreatePartnerCommand(body.name));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('detail')
  async getPartnerDetail(@Query('partnerId') id: number): Promise<FindPartnerByIdResult> {
    return await this.queryBus.execute(new FindPartnerByIdQuery(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('update')
  async updatePartner(@Body() body: updatePartnerRequestDTO): Promise<void> {
    return this.commandBus.execute(new UpdatePartnerCommand(body.id, body.name));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('update/status/:id')
  async updatePartnerStatus(@Param('id') id: number): Promise<void> {
    return this.commandBus.execute(new ChangeStatusPartnerCommand(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('apikey/add')
  async addApikey(@Body() body: createApikeyRequestDTO): Promise<void> {
    return this.commandBus.execute(new CreateApikeyCommand(body.description, body.partnerId));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('apikey/detail')
  async getApikeyDetail(@Query('id') id: number): Promise<FindApikeyByIdResult> {
    return await this.queryBus.execute(new FindApikeyByIdQuery(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('apikey/update')
  async updateApikey(@Body() body: updateApikeyRequestDTO): Promise<void> {
    return this.commandBus.execute(new UpdateApikeyCommand(body.id, body.key, body.description));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('apikey/revoke/:sid')
  async deleteApikey(@Param('sid') id: number): Promise<void> {
    return this.commandBus.execute(new DeleteApikeyCommand(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('ipwhitelist/add')
  async addIPWhitelist(@Body() body: createIpWhitelistRequestDTO): Promise<void> {
    return this.commandBus.execute(new CreateIpWhitelistCommand(body.ip, body.description, body.partnerId));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('ipwhitelist/detail')
  async getIPWhitelistDetail(@Query('id') id: number): Promise<FindIpWhitelistByIdResult> {
    return await this.queryBus.execute(new FindIpWhitelistByIdQuery(id));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('ipwhitelist/update')
  async updateIPWhitelist(@Body() body: updateIpWhitelistRequestDTO): Promise<void> {
    return this.commandBus.execute(new UpdateIpWhitelistCommand(body.id, body.ip, body.description));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('ipwhitelist/revoke/:sid')
  async revokeIPWhitelist(@Param('sid') id: number): Promise<void> {
    return this.commandBus.execute(new DeleteIpWhitelistCommand(id));
  }
}
