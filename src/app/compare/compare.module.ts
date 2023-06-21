import { GroupPricechangeEntity } from 'src/sku/infratsructure/entity/group_price_change';
import { ItemSellPriceEntity } from 'src/sku/infratsructure/entity/item_sell_price';
import { PricechangeEntity } from 'src/sku/infratsructure/entity/price_change';
import { PricechangeTempEntity } from 'src/sku/infratsructure/entity/price_change_temp';
import { PriceEntity } from 'src/sku/infratsructure/entity/price';
import { SkuEntity } from 'src/sku/infratsructure/entity/sku';
import { SkuImageEntity } from 'src/sku/infratsructure/entity/sku_image';
import { UomEntity } from 'src/sku/infratsructure/entity/uom';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkuModule } from 'src/sku/sku.module';
import { CompareController } from './compare.controller';
import { CompareService } from './compare.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';

@Module({
    imports: [CqrsModule, SkuModule],
    controllers: [CompareController],
    providers: [CompareService, PriceService, PriceServiceRepositoryImplement],
})
export class CompareModule { }
