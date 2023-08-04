import { Logger, Module, forwardRef } from '@nestjs/common';
import { CompareController } from './compare.controller';
import { CompareService } from './compare.service';
import { SkuModule } from 'src/sku/sku.module';

@Module({
  imports: [forwardRef(() => SkuModule)],
  controllers: [CompareController],
  providers: [Logger, CompareService],
  exports: [CompareService]
})
export class CompareModule {}
