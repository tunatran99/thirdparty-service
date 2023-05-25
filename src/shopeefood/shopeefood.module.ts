import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShopeefoodController } from './presentation/shopeefood.controller';
import { CategoryQueryImplement } from './infratsructure/query/category.query.implement';
import { FindCategoryByCodesQueryHandler } from './application/query-handler/find.category.bycodes.handler';

const infrastructure = [CategoryQueryImplement];

const application = [FindCategoryByCodesQueryHandler];

const domain = [];

@Module({
  imports: [CqrsModule],
  controllers: [ShopeefoodController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ShopeefoodModule {}
