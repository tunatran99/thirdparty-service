import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  FindPartner,
  FindRole, FindStore
} from '../application/query/find.masterdata.query';

@Controller('masterdata')
export class MasterdataController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}
  @Get('role')
  async FindRole(): Promise<any> {
    const q = new FindRole();
    return await this.queryBus.execute(q);
  }
  @Get('store')
  async FindStore(): Promise<any> {
    const q = new FindStore();
    return await this.queryBus.execute(q);
  }
  @Get('partner')
  async FindPartner(): Promise<any> {
    const q = new FindPartner();
    return await this.queryBus.execute(q);
  }
}
