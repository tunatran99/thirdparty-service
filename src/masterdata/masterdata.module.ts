import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  FindPartnerHandler,
  FindRoleHandler, FindStoreHandler
} from './application/query-handler/find.masterdata.handler';
import { MasterdataQueryImplement } from './infratsructure/query/masterdata.query.implement';
import { MasterdataController } from './presentation/masterdata.controller';

const infrastructure = [MasterdataQueryImplement];

const application = [
  FindRoleHandler,
  FindStoreHandler,
  FindPartnerHandler
];

const domain = [];

@Module({
  imports: [CqrsModule],
  controllers: [MasterdataController],
  providers: [...infrastructure, ...application, ...domain],
})
export class MasterdataModule {}
