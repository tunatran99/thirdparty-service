import { Logger, Module } from '@nestjs/common';
import { CompareController } from './compare.controller';
import { CompareService } from './compare.service';

@Module({
  imports: [],
  controllers: [CompareController],
  providers: [Logger, CompareService],
})
export class CompareModule {}
