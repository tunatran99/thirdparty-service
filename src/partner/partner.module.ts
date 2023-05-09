import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePartnerHandler } from './application/command-handler/create.partner.handler';
import { PartnerFactory } from './domain/partner.factory';
import { PartnerRepositoryImplement } from './infratsructure/repository/partner.repository.implement';
import { PartnerController } from './presentation/partner.controller';
import { PartnerQueryImplement } from './infratsructure/query/partner.query.implement';
import { FindPartnerByIdQueryHandler } from './application/query-handler/find.partner.byid.handler';
import { UpdatePartnerHandler } from './application/command-handler/update.partner.handler';
import { ChangeStatusPartnerHandler } from './application/command-handler/change.status.partner.handler';
import { FindPartnerQueryHandler } from './application/query-handler/find.partner.handler';
import { CreateApikeyHandler } from './application/command-handler/create.apikey.handler';
import { ApikeyFactory } from './domain/apikey.factory';
import { ApikeyRepositoryImplement } from './infratsructure/repository/apikey.repository.implement';
import { ApikeyQueryImplement } from './infratsructure/query/apikey.query.implement';
import { FindApikeyByIdQueryHandler } from './application/query-handler/find.apikey.byid.handler';
import { UpdateApikeyHandler } from './application/command-handler/update.apikey.handler';
import { DeleteApikeyHandler } from './application/command-handler/delete.apikey.handler';
import { IpWhitelistRepositoryImplement } from './infratsructure/repository/ipwhitelist.repository.implement';
import { CreateIpWhitelistHandler } from './application/command-handler/create.ipwhitelist.handler';
import { IpWhitelistFactory } from './domain/ipwhitelist.factory';
import { IpWhitelistQueryImplement } from './infratsructure/query/ipwhitelist.query.implement';
import { FindIpWhitelistByIdQueryHandler } from './application/query-handler/find.ipwhitelist.byid.handler';
import { UpdateIpWhitelistHandler } from './application/command-handler/update.ipwhitelist.handler';
import { DeleteIpWhitelistHandler } from './application/command-handler/delete.ipwhitelist.handler';
import { FindPartnerByApikeyQueryHandler } from './application/query-handler/find.partner.byapikey.handler';

const infrastructure = [
  PartnerRepositoryImplement,
  PartnerQueryImplement,
  ApikeyRepositoryImplement,
  ApikeyQueryImplement,
  IpWhitelistRepositoryImplement,
  IpWhitelistQueryImplement,
];

const application = [
  FindPartnerQueryHandler,
  CreatePartnerHandler,
  FindPartnerByIdQueryHandler,
  UpdatePartnerHandler,
  ChangeStatusPartnerHandler,
  CreateApikeyHandler,
  FindApikeyByIdQueryHandler,
  UpdateApikeyHandler,
  DeleteApikeyHandler,
  CreateIpWhitelistHandler,
  FindIpWhitelistByIdQueryHandler,
  UpdateIpWhitelistHandler,
  DeleteIpWhitelistHandler,
  FindPartnerByApikeyQueryHandler,
];

const domain = [PartnerFactory, ApikeyFactory, IpWhitelistFactory];

@Module({
  imports: [CqrsModule],
  controllers: [PartnerController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class PartnerModule {}
