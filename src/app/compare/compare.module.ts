import { Logger, Module } from '@nestjs/common';
import { CompareController } from './compare.controller';
import { CompareService } from './compare.service';
import { SkuModule } from 'src/sku/sku.module';

@Module({
  imports: [SkuModule],
  controllers: [CompareController],
  providers: [Logger, CompareService],
})
export class CompareModule {}
