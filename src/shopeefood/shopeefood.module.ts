import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ShopeefoodController } from './presentation/shopeefood.controller';

const infrastructure = [];

const application = [];

const domain = [];

@Module({
  imports: [CqrsModule],
  controllers: [ShopeefoodController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class ShopeefoodModule {}
