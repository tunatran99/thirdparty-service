import { Body, Controller, Get, HttpCode, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';
import JwtAuthenticationGuard from 'src/user/authentication/jwt-authentication.guard';
import { RequestWithPartner } from 'src/user/presentation/dto/requested.partner.interface';
import { CronUpdatePrice } from '../application/command/cron.update.price';
import { DownloadPriceToMobile } from '../application/command/download.price.to.mobile';
import { UpdateAppliedList } from '../application/command/update.applied.list';
import { FindCategory, FindDepartment, FindDivision, FindFilterInfoQuery, FindGroup, FindStore } from '../application/query/find.filter.info.query';
import { FindSkuPricesByCodesQuery } from '../application/query/find.sku.prices.bycodes.query';
import { FindSkuPricesByCodesResult } from '../application/query/find.sku.prices.bycodes.result';
import { FindSkuPricesByPartnerQuery } from '../application/query/find.sku.prices.bypartner.query';
import { FindSkuPricesDetailQuery } from '../application/query/find.sku.prices.detail.query';
import { FindSkuByPartnerRequestDTO } from './dto/find.sku.bypartner.request.dto';
import { FindSkuPriceDetailRequestDTO } from './dto/find.sku.price.detail.request.dto';
import { FindSkuPricesRequestDTO } from './dto/find.sku.prices.request.dto';
import { UpdateAppliedListRequestDTO } from './dto/update.applied.list.request.dto';
import { A3PLogInterceptor } from 'libs/a3p.log.interceptor';
import { CronSyncMenu } from '../application/command/cron.sync.menu';
import { ImportImageLink } from '../application/command/import.image.link.command';
import { CheckImportImageLink } from '../application/query/check.import.image.link.query';
import { CheckImportImageLinkResult } from '../application/query/check.import.image.link.result';
import { CheckImportImageDTO } from './dto/check.import.image.query.dto';
import { SaveImageLinkRequestDTO } from './dto/save.image.link.request.dto';

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

  // @UseGuards(ApiKeyAuthenticationGuard)
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

  // @Post('sync')
  @Cron('0 0 20 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  }) // 08:00 PM
  async syncMenu(@Body('store') store?: string): Promise<void> {
    return await this.commandBus.execute(new CronSyncMenu());
  }

  @Post('sync')
  async syncMenuManual(@Body('store') store?: string): Promise<void> {
    return await this.commandBus.execute(new CronSyncMenu(store));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('listskubypartner')
  async listSkuByPartner(@Query() query: FindSkuByPartnerRequestDTO) {
    return await this.queryBus.execute(new FindSkuPricesByPartnerQuery(query));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getfilterinfos')
  async getFilterInfos(@Query('partners') partners?: string[]) {
    return await this.queryBus.execute(new FindFilterInfoQuery(partners));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getstores')
  async getStores(@Query('stores') stores?: string[], @Query('refId') refId?: number) {
    return await this.queryBus.execute(new FindStore(stores, refId));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getdivs')
  async getDivs(@Query('refId') refId?: string | string[]) {
    const data = Array.isArray(refId) ? refId : [refId];
    return await this.queryBus.execute(new FindDivision(data));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getgroups')
  async getGroups(@Query('refId') refId?: string | string[]) {
    const data = Array.isArray(refId) ? refId : [refId];
    return await this.queryBus.execute(new FindGroup(data));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getdepts')
  async getDepts(@Query('refId') refId?: string | string[]) {
    const data = Array.isArray(refId) ? refId : [refId];
    return await this.queryBus.execute(new FindDepartment(data));
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('getcates')
  async getCates(@Query('refId') refId?: string | string[]) {
    const data = Array.isArray(refId) ? refId : [refId];
    return await this.queryBus.execute(new FindCategory(data));
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

  @Post('import/image-link/check')
  async CheckImportImageLink(@Body() body: CheckImportImageDTO): Promise<CheckImportImageLinkResult> {
    const q = new CheckImportImageLink(body.sku, body.partner);
    return await this.queryBus.execute(q);
  }
  @Post('import/image-link')
  async ImportImageLink(@Body() body: SaveImageLinkRequestDTO[]): Promise<void> {
    const command = new ImportImageLink(body);
    await this.commandBus.execute(command);
  }
}
