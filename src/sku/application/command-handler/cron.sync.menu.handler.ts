import { Transactional } from '@libs/transaction.decorator';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import moment from 'moment';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import { CronSyncMenu } from '../command/cron.sync.menu';
import * as ExcelJS from 'exceljs';

@CommandHandler(CronSyncMenu)
export class CronSyncMenuHandler implements ICommandHandler<CronSyncMenu, void> {
  constructor(private readonly priceService: PriceService) {}

  // @Inject()
  // private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Transactional()
  async execute({ store }: CronSyncMenu): Promise<void> {
    await this.priceService.syncMenu(store);
  }
}
