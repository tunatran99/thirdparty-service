import { Body, Controller, Get, HttpCode, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';
import JwtAuthenticationGuard from 'src/user/authentication/jwt-authentication.guard';
import { RequestWithPartner } from 'src/user/presentation/dto/requested.partner.interface';
import { CronUpdatePrice } from '../application/command/cron.update.price';
import { DownloadPriceToMobile } from '../application/command/download.price.to.mobile';
import { UpdateAppliedList } from '../application/command/update.applied.list';
import { FindFilterInfoQuery } from '../application/query/find.filter.info.query';
import { FindSkuPricesByCodesQuery } from '../application/query/find.sku.prices.bycodes.query';
import { FindSkuPricesByCodesResult } from '../application/query/find.sku.prices.bycodes.result';
import { FindSkuPricesByPartnerQuery } from '../application/query/find.sku.prices.bypartner.query';
import { FindSkuPricesDetailQuery } from '../application/query/find.sku.prices.detail.query';
import { FindSkuByPartnerRequestDTO } from './dto/find.sku.bypartner.request.dto';
import { FindSkuPriceDetailRequestDTO } from './dto/find.sku.price.detail.request.dto';
import { FindSkuPricesRequestDTO } from './dto/find.sku.prices.request.dto';
import { UpdateAppliedListRequestDTO } from './dto/update.applied.list.request.dto';
import { A3PLogInterceptor } from 'libs/a3p.log.interceptor';
import { NewCronUpdatePrice } from '../application/command/new.cron.update.price';

@Controller('sku')
export class SkuController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(ApiKeyAuthenticationGuard)
  // @UseInterceptors(A3PLogInterceptor)
  @HttpCode(200)
  @Post('getbycodes')
  async findSkuByCodes(
    @Req() request: RequestWithPartner,
    @Body() body: FindSkuPricesRequestDTO,
  ): Promise<FindSkuPricesByCodesResult> {
    return await this.queryBus.execute(new FindSkuPricesByCodesQuery(request.user.id, body.skus));
  }

  @UseGuards(ApiKeyAuthenticationGuard)
  @UseInterceptors(A3PLogInterceptor)
  @HttpCode(200)
  @Post('downloadtomobile')
  async downloadPriceToMobile(@Body() body: FindSkuPricesRequestDTO): Promise<void> {
    return await this.commandBus.execute(new DownloadPriceToMobile(body.skus));
  }

  @Cron('0 0 18 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  }) // 06:00 PM
  async updatePricesCronjob(): Promise<void> {
    return await this.commandBus.execute(new CronUpdatePrice());
  }
  // @HttpCode(200)
  // @Post('tmr_manual')
  // async updatePricesCronjob(): Promise<void> {
  //   return await this.commandBus.execute(new CronUpdatePrice());
  // }

  // @Cron('0 0 21 * * *', {
  //   timeZone: 'Asia/Ho_Chi_Minh',
  // }) // 09:00 PM
  // @UseGuards(ApiKeyAuthenticationGuard)
  // @UseInterceptors(A3PLogInterceptor)
  // @HttpCode(200)
  // @Post('update_amendsku_price')
  // async updatePricesNewSKUCronjob(): Promise<void> {
  //   return await this.commandBus.execute(new NewCronUpdatePrice());
  // }

  // @Post('testCron')
  // async testUpdatePricesCronjob(): Promise<void> {
  //   return await this.commandBus.execute(new CronUpdatePrice());
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Get('listskubypartner')
  async listSkuByPartner(@Query() query: FindSkuByPartnerRequestDTO) {
    return await this.queryBus.execute(new FindSkuPricesByPartnerQuery(query));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getfilterinfos')
  async getFilterInfos() {
    return await this.queryBus.execute(new FindFilterInfoQuery());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('skudetail')
  async skuDetail(@Query() query: FindSkuPriceDetailRequestDTO) {
    return await this.queryBus.execute(new FindSkuPricesDetailQuery(query.partnerId, query.sku));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('updateskuapplylist')
  async updateSkuApplyList(@Body() body: UpdateAppliedListRequestDTO) {
    body.items.forEach((i) => {
      i.partnerId = Number.parseInt(i.partnerId as unknown as string);
    });
    return await this.commandBus.execute(new UpdateAppliedList(body.items));
  }
}
