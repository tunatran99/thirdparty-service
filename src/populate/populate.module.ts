import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateDataHandler } from './application/command-handler/create.data.handler';
// import { DataFactory } from './domain/data.factory';
import { DataRepositoryImplement } from './infratsructure/repository/data.repository.implement';
import { PopulateController } from './presentation/populate.controller';

const infrastructure = [DataRepositoryImplement];

const application = [
  CreateDataHandler
];

const domain = [/*DataFactory*/];

@Module({
  imports: [CqrsModule],
  controllers: [PopulateController],
  providers: [...infrastructure, ...application, ...domain],
})
export class DataModule {}
