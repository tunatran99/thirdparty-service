import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import JwtAuthenticationGuard from 'src/user/authentication/jwt-authentication.guard';
import { FindLogQuery } from '../application/query/find.log.query';
import { FindLogResult } from '../application/query/find.log.result';
import { FindLogRequestDTO } from './dto/find.log.request.dto';

@Controller('log')
export class LogController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async FindLog(@Query() query: FindLogRequestDTO): Promise<FindLogResult> {
    return await this.queryBus.execute(new FindLogQuery(query));
  }
}
