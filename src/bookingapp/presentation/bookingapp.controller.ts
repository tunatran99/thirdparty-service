import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';
import { FindDepartmentByCodesQuery } from '../application/query/find.department.bycodes.query';
import { FindLineByCodesQuery } from '../application/query/find.line.bycodes.query';
import { FindPOByCodesQuery } from '../application/query/find.po.bycodes.query';
import { FindProductByCodesQuery } from '../application/query/find.product.bycodes.query';
import { FindSupplierByCodesQuery } from '../application/query/find.supplier.bycodes.query';
import { FindPOByCodesScheduleQuery } from '../application/query/find.po.bycodes.schedule.query';

@Controller('bookingapp')
export class BookingappController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus, 
    private readonly schedulerRegistry: SchedulerRegistry) {}

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('download_supplier')
  async downloadSuppliers(@Body('codes') codes: string[]): Promise<void> {
    return await this.queryBus.execute(new FindSupplierByCodesQuery(codes));
  }

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('download_line')
  async downloadLines(@Body('codes') codes: string[]): Promise<void> {
    return await this.queryBus.execute(new FindLineByCodesQuery(codes));
  }

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('download_department')
  async downloadDepartments(@Body('codes') codes: string[]): Promise<void> {
    return await this.queryBus.execute(new FindDepartmentByCodesQuery(codes));
  }

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('download_product')
  async downloadProducts(@Body('codes') codes: string[]): Promise<void> {
    return await this.queryBus.execute(new FindProductByCodesQuery(codes));
  }

  // @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('download_purchase_order')
  async downloadPurchaseOrders(@Body('codes') codes: string[]): Promise<void> {
    return await this.queryBus.execute(new FindPOByCodesQuery(codes));
  }

  // @Cron('0 */5 * * * *', {
  //   timeZone: 'Asia/Ho_Chi_Minh',
  // }) // 5 minutes
  @HttpCode(200)
  @Post('test_cron')
  async downloadPOCronjob(@Body('codes') codes: string[]): Promise<void> {
    return await this.queryBus.execute(new FindPOByCodesScheduleQuery(codes));
  }

  // @HttpCode(200)
  // @Post('stop_cron')
  // async stopCronJob(): Promise<void> {
  //   const jobs = this.schedulerRegistry.getCronJobs()
  //   jobs.forEach(job => job.stop());
  //   console.log('DONE')
  // }
}
