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
      "partnerMerchantID": "5f30f9b15e87725cdf1f971a",
      "currency": {
          "code": "VND",
          "symbol": "₫",
          "exponent": 0
      },
      "sections": [
          {
              "id": "1008",
              "name": "Regular Menu",
              "serviceHours": {
                  "mon": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  },
                  "tue": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  },
                  "wed": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  },
                  "thu": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  },
                  "fri": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  },
                  "sat": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  },
                  "sun": {
                      "openPeriodType": "OpenPeriod",
                      "periods": [
                          {
                              "startTime": "10:00",
                              "endTime": "23:30"
                          }
                      ]
                  }
              },
              "categories": {}
          }
      ]
  };

  const { categories } = await this.queryBus.execute(new FindCategoryByCodesQuery(id));
  console.log("cate", categories);
  payload.sections[0].categories = categories;
  
    return payload;
  }
}
