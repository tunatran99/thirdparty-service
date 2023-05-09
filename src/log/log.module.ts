import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindLogQueryHandler } from './application/query-handler/find.log.handler';
import { CustomLogger } from './domain/custom.log.implement';
import { LogQueryImplement } from './infratsructure/query/log.query.implement';
import { LogRepositoryImplement } from './infratsructure/repository/log.repository.implement';
import { LogController } from './presentation/log.controller';

const infrastructure = [LogRepositoryImplement, LogQueryImplement];

const application = [FindLogQueryHandler];

const domain = [CustomLogger];

@Module({
  imports: [CqrsModule],
  controllers: [LogController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [CustomLogger],
})
export class LogModule {}
