import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShopeefoodController } from './presentation/shopeefood.controller';
import { CategoryQueryImplement } from './infratsructure/query/category.query.implement';
import { FindCategoryByCodesQueryHandler } from './application/query-handler/find.category.bycodes.handler';
import { DataRepositoryImplement } from './infratsructure/repository/data.repository.implement';
import { CreateDataHandler } from './application/command-handler/create.data.handler';
import { CreateCategoryHandler } from './application/command-handler/create.category.handler';
import { CategoryRepositoryImplement } from './infratsructure/repository/category.repository.implement';

const infrastructure = [CategoryQueryImplement, DataRepositoryImplement, CategoryRepositoryImplement];

const application = [FindCategoryByCodesQueryHandler, CreateDataHandler, CreateCategoryHandler];

const domain = [];

@Module({
  imports: [CqrsModule],
  controllers: [ShopeefoodController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ShopeefoodModule {}
