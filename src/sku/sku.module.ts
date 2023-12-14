import { Logger, Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LogModule } from 'src/log/log.module';
import { DownloadPriceToMobileHandler } from './application/command-handler/download.price.to.mobile.handler';
import { UpdateAppliedListHandler } from './application/command-handler/update.applied.list.handler';
import { FoundSkuPricesSetRelationEventHandler } from './application/event-handler/found.sku.prices.set.relation.handler';
import { FindCategoryHandler, FindDepartmentHandler, FindDivisionHandler, FindFilterInfoQueryHandler, FindGroupHandler, FindStoreHandler } from './application/query-handler/find.filter.info.handler';
import { FindSkuPricesByCodesQueryHandler } from './application/query-handler/find.sku.bycodes.handler';
import { FindSkuPricesByPartnerQueryHandler } from './application/query-handler/find.sku.bypartner.handler';
import { FindSkuPricesDetailQueryHandler } from './application/query-handler/find.sku.detail.handler';
import { PriceService } from './domain/price.service';
import { SkuPricesQueryImplement } from './infratsructure/query/sku.prices.query.implement';
import { PartnerPricesRepositoryImplement } from './infratsructure/repository/partner.prices.repository.implement';
import { PriceServiceRepositoryImplement } from './infratsructure/repository/price.service.repository.implement';
import { SkuController } from './presentation/sku.controller';
import { CronUpdatePriceHandler } from './application/command-handler/cron.update.price.handler';
import { CompareModule } from 'src/app/compare/compare.module';
import { CronSyncMenuHandler } from './application/command-handler/cron.sync.menu.handler';
import { ImportImageLinkHandler } from './application/command-handler/import.image.link.handler';
import { CheckImportImageLinkHandler } from './application/query-handler/check.import.image.link.handler';
import { SkuImageLinkRepositoryImplement } from './infratsructure/repository/sku.image.link.repository.implement';
import { SkuImageLinkFactory } from './domain/sku.image.link.factory';

const infrastructure = [SkuPricesQueryImplement, PartnerPricesRepositoryImplement, PriceServiceRepositoryImplement, SkuImageLinkRepositoryImplement];

const application = [
  FindSkuPricesByCodesQueryHandler,
  FoundSkuPricesSetRelationEventHandler,
  DownloadPriceToMobileHandler,
  FindSkuPricesByPartnerQueryHandler,
  FindFilterInfoQueryHandler,
  FindSkuPricesDetailQueryHandler,
  UpdateAppliedListHandler,
  CronUpdatePriceHandler,
  CronSyncMenuHandler,
  FindStoreHandler,
  FindDivisionHandler,
  FindGroupHandler,
  FindDepartmentHandler,
  FindCategoryHandler,
  CheckImportImageLinkHandler,
  ImportImageLinkHandler
];

const domain = [PriceService, SkuImageLinkFactory];

@Module({
  imports: [CqrsModule, LogModule, forwardRef(() => CompareModule)],
  controllers: [SkuController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
  exports: [PriceService, PriceServiceRepositoryImplement]
})
export class SkuModule {}
