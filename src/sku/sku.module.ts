import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LogModule } from 'src/log/log.module';
import { DownloadPriceToMobileHandler } from './application/command-handler/download.price.to.mobile.handler';
import { UpdateAppliedListHandler } from './application/command-handler/update.applied.list.handler';
import { FoundSkuPricesSetRelationEventHandler } from './application/event-handler/found.sku.prices.set.relation.handler';
import { FindFilterInfoQueryHandler } from './application/query-handler/find.filter.info.handler';
import { FindSkuPricesByCodesQueryHandler } from './application/query-handler/find.sku.bycodes.handler';
import { FindSkuPricesByPartnerQueryHandler } from './application/query-handler/find.sku.bypartner.handler';
import { FindSkuPricesDetailQueryHandler } from './application/query-handler/find.sku.detail.handler';
import { PriceService } from './domain/price.service';
import { SkuPricesQueryImplement } from './infratsructure/query/sku.prices.query.implement';
import { PartnerPricesRepositoryImplement } from './infratsructure/repository/partner.prices.repository.implement';
import { PriceServiceRepositoryImplement } from './infratsructure/repository/price.service.repository.implement';
import { SkuController } from './presentation/sku.controller';

const infrastructure = [SkuPricesQueryImplement, PartnerPricesRepositoryImplement, PriceServiceRepositoryImplement];

const application = [
  FindSkuPricesByCodesQueryHandler,
  FoundSkuPricesSetRelationEventHandler,
  DownloadPriceToMobileHandler,
  FindSkuPricesByPartnerQueryHandler,
  FindFilterInfoQueryHandler,
  FindSkuPricesDetailQueryHandler,
  UpdateAppliedListHandler,
];

const domain = [PriceService];

@Module({
  imports: [CqrsModule, LogModule],
  controllers: [SkuController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class SkuModule {}
