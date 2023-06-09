import { Body, Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';
import { FindCategoryByCodesQuery } from '../application/query/find.category.bycodes.query';

@Controller('shopeefood')
export class ShopeefoodController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Get('merchant/menu')
  async getMenu(@Query('partnerMerchantID') id: number): Promise<any> {
    let payload = {
      "merchantID": "GFSBPOS-700-854",
      "partnerMerchantID": `${id}`,
      "section": {}
  };

  const { section } = await this.queryBus.execute(new FindCategoryByCodesQuery(id));
  payload.section = section;
  
    return payload;
  }
}
