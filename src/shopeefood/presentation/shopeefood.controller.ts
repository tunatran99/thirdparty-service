import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';
import { FindItemByCodesQuery } from '../application/query/find.item.bycodes.query';

@Controller('shopeefood')
export class ShopeefoodController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('menu')
  async getMenu(@Body('restaurant_id') restaurant_id: string): Promise<any> {
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
              "categories": [
                  {
                      "id": "5f30fe9195515c6642b4aeb6",
                      "sequence": 7,
                      "name": "Thức uống",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc00018e",
                              "sequence": 144,
                              "name": "Coca Cola",
                              "availableStatus": "AVAILABLE",
                              "description": "Vị ngọt thổi bừng hứng khởi",
                              "price": 31320,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/40800006.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00018f",
                              "sequence": 143,
                              "name": "Coca Cola Light",
                              "availableStatus": "AVAILABLE",
                              "description": "Vị ngọt nhẹ mang lại cảm hứng",
                              "price": 31320,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/40800007.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000190",
                              "sequence": 98,
                              "name": "Sprite",
                              "availableStatus": "AVAILABLE",
                              "description": "Thoả mãn cơn khát",
                              "price": 31320,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/40800008.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a0",
                              "sequence": 137,
                              "name": "Bia 4P’s Session IPA (4.5% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Với nồng độ cồn thấp, IPA được làm từ bột pizza của 4P's",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a1",
                              "sequence": 94,
                              "name": "Bia 4P’s Dalat Whey Stout (5.5% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Loại bia đen sản xuất theo hướng bền vững khi được làm từ nước whey",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300002.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a2",
                              "sequence": 135,
                              "name": "Bia 4P’s Premium Lager (5.5% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Dòng bia lager cổ điển là sự kết hợp lý tưởng với mọi món ăn",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a3",
                              "sequence": 96,
                              "name": "Bia 4P’s KAGUA Roast (6.2% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Hương thơm độc đáo của tiêu Nhật Sansho và mạch nha rang",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300005.png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  },
                  {
                      "id": "5f30fe9195515c6642b4aeb9",
                      "sequence": 1,
                      "name": "Bánh Pizza",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc00014d",
                              "sequence": 140,
                              "name": "Phô mai Burrata Margherita thịt nguội Pizza",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Xốt cà chua cùng phô mai Burrata và thịt nguội Ý Parma",
                              "price": 421200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000003.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00014d-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00014e",
                              "sequence": 137,
                              "name": "3 loại phô mai nhà làm Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano và Camembert",
                              "price": 194400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000005.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00014e-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00014f",
                              "sequence": 138,
                              "name": "4 loại phô mai nhà làm Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano, Camembert và phô mai xanh",
                              "price": 259200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000006%20-%204%20Cheese%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00014f-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000150",
                              "sequence": 139,
                              "name": "5 loại phô mai nhà làm Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano, Camembert, Raclette và phô mai xanh",
                              "price": 302400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000007%20-%205%20Cheese%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000150-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000151",
                              "sequence": 123,
                              "name": "Margherita Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, phô mai Mozzarella, Grano Padano, xốt cà chua và húng tây",
                              "price": 162000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000008%20-%20Margherita%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000151-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000152",
                              "sequence": 135,
                              "name": "Thịt nguội Ý Parma và rau rocket với xốt cà chua",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt nguội Ý Parma và rau rocket với xốt cà chua",
                              "price": 313200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000009%20-%20Extra%20Parma%20Ham%20Margherita.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000152-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000153",
                              "sequence": 134,
                              "name": "Margherita với xúc xích Ý Milano và xúc xích cay Chorizo Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Xúc xích Ý Milano và Chorizo với xốt cà chua",
                              "price": 237600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000010.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000153-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000154",
                              "sequence": 125,
                              "name": "Cà tím nướng Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, cà tím với xốt giấm Balsamic và xốt cà chua",
                              "price": 194400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000011%20-%20Eggplant%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000154-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000155",
                              "sequence": 131,
                              "name": "Cá hồi xốt kem miso Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Cá hồi với miso ngọt và xốt kem béo thơm",
                              "price": 270000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000013%20-%20Salmon%20Miso%20Cream%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000155-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000156",
                              "sequence": 132,
                              "name": "Hải sản xốt cà chua cay với phô mai hun khói Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Tôm, mực, nghêu, phô mai hun khói và xốt cà chua",
                              "price": 259200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000014.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000156-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000157",
                              "sequence": 129,
                              "name": "Tôm và xốt Mayonnaise Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Tôm và bông cải xanh kèm xốt mayonnaise",
                              "price": 248400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000015.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000157-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000158",
                              "sequence": 130,
                              "name": "Gà xốt Teriyaki Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Gà xốt nước tương ngọt với rong biển, lá tía tô và mayonnaise",
                              "price": 216000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000017%20-%20Teriyaki%20Chicken%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000158-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000159",
                              "sequence": 133,
                              "name": "Phô mai Camembert nhà làm và xốt nấm thịt nguội Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt nấm với thịt nguội và phô mai Camembert nhà làm",
                              "price": 194400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000018%20-%20Camembert%20_%20Ham%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000159-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00015c",
                              "sequence": 126,
                              "name": "4 loại nấm Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, nấm trắng và nâu, nấm linh chi trắng và nâu, tỏi",
                              "price": 194400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000024%20-%204%20Mushroom%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00015c-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00015d",
                              "sequence": 127,
                              "name": "Rau cải xoăn kèm phô mai Ricotta chanh nhà làm với xốt ô liu và nụ bạch hoa Piz",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay",
                              "price": 172800,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10004067%20-%20Vegetarian%20Kale%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00015d-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000160",
                              "sequence": 50,
                              "name": "(H) Pizza Phô mai Burrata Margherita thịt nguội",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Xốt cà chua cùng phô mai Burrata và thịt nguội Ý Parma",
                              "price": 210600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000003.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000160-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000160-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000161",
                              "sequence": 50,
                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano và Camembert",
                              "price": 97200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000005.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000161-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000161-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000162",
                              "sequence": 50,
                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano, Camembert và phô mai xanh",
                              "price": 129600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000006%20-%204%20Cheese%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000162-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000162-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000163",
                              "sequence": 50,
                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano, Camembert, Raclette và phô mai xanh",
                              "price": 151200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000007%20-%205%20Cheese%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000163-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000163-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000164",
                              "sequence": 50,
                              "name": "(H) Pizza Margherita",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, phô mai Mozzarella, Grano Padano, xốt cà chua và húng tây",
                              "price": 81000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000008%20-%20Margherita%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000164-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000164-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000165",
                              "sequence": 50,
                              "name": "(H) Pizza Margherita thịt nguội",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt nguội Ý Parma và rau rocket với xốt cà chua",
                              "price": 156600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000009%20-%20Extra%20Parma%20Ham%20Margherita.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000165-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000165-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000166",
                              "sequence": 50,
                              "name": "(H) Pizza Margherita với xúc xích Ý Milano và xúc xích cay Chorizo",
                              "availableStatus": "AVAILABLE",
                              "description": "Xúc xích Ý Milano và Chorizo với xốt cà chua",
                              "price": 118800,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000010.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000166-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000166-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000167",
                              "sequence": 50,
                              "name": "(H) Pizza Magherita cà tím nướng",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, cà tím với xốt giấm Balsamic và xốt cà chua",
                              "price": 97200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000011%20-%20Eggplant%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000167-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000167-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000168",
                              "sequence": 50,
                              "name": "(H) Pizza Cá hồi xốt kem miso",
                              "availableStatus": "AVAILABLE",
                              "description": "Cá hồi với miso ngọt và xốt kem béo thơm",
                              "price": 135000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000013%20-%20Salmon%20Miso%20Cream%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000168-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000168-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000169",
                              "sequence": 50,
                              "name": "(H) Pizza Hải sản xốt cà chua cay với phô mai hun khói",
                              "availableStatus": "AVAILABLE",
                              "description": "Tôm, mực, nghêu, phô mai hun khói và xốt cà chua",
                              "price": 129600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000014.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000169-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000169-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00016a",
                              "sequence": 50,
                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                              "availableStatus": "AVAILABLE",
                              "description": "Tôm và bông cải xanh kèm xốt mayonnaise",
                              "price": 124200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000015.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00016a-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc00016a-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00016b",
                              "sequence": 50,
                              "name": "(H) Pizza Gà xốt Teriyaki",
                              "availableStatus": "AVAILABLE",
                              "description": "Gà xốt nước tương ngọt với rong biển, lá tía tô và mayonnaise",
                              "price": 108000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000017%20-%20Teriyaki%20Chicken%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00016b-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc00016b-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00016c",
                              "sequence": 50,
                              "name": "(H) Pizza Phô mai Camembert nhà làm và xốt nấm thịt nguội",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt nấm với thịt nguội và phô mai Camembert nhà làm",
                              "price": 97200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000018%20-%20Camembert%20_%20Ham%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00016c-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc00016c-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00016f",
                              "sequence": 50,
                              "name": "(H) Pizza 4 loại nấm",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, nấm trắng và nâu, nấm linh chi trắng và nâu, tỏi",
                              "price": 97200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000024%20-%204%20Mushroom%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00016f-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc00016f-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000170",
                              "sequence": 50,
                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Ricotta chanh nhà làm với xốt ô liu và nụ bạ",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay",
                              "price": 86400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10004067%20-%20Vegetarian%20Kale%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000170-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "5f5b9c31af540000fc000170-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "6064584ffc7c0000e3007773",
                              "sequence": 88,
                              "name": "Cà ri gà kiểu Tandoori Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt cà ri nhà làm với thịt gà và đậu bắp",
                              "price": 216000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000046.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "6064584ffc7c0000e3007773-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "606458abfc7c0000e3007774",
                              "sequence": 50,
                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt cà ri nhà làm với thịt gà và đậu bắp",
                              "price": 108000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000046.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "606458abfc7c0000e3007774-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458fefc7c0000e3007776###Half",
                                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                                              "price": 79920,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "606458abfc7c0000e3007774-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "606458ecfc7c0000e3007775",
                              "sequence": 82,
                              "name": "Xốt bí ngòi quế tây Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, bí ngòi và hoa cùng xốt húng tây và hạt",
                              "price": 159840,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000053.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "606458ecfc7c0000e3007775-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "606458fefc7c0000e3007776",
                              "sequence": 82,
                              "name": "(H) Pizza Xốt bí ngòi quế tây",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, bí ngòi và hoa cùng xốt húng tây và hạt",
                              "price": 79920,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000053.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "606458fefc7c0000e3007776-Half",
                                      "name": "Vui lòng chọn nửa bánh còn lại",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b9c31af540000fc000160###Half",
                                              "name": "(H) Pizza Phô mai Burrata Margherita th",
                                              "price": 210600,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000161###Half",
                                              "name": "(H) Pizza 3 loại phô mai nhà làm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000162###Half",
                                              "name": "(H) Pizza 4 loại phô mai nhà làm",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000163###Half",
                                              "name": "(H) Pizza 5 loại phô mai nhà làm",
                                              "price": 151200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000164###Half",
                                              "name": "(H) Pizza Margherita",
                                              "price": 81000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000165###Half",
                                              "name": "(H) Pizza Margherita thịt nguội",
                                              "price": 156600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000166###Half",
                                              "name": "(H) Pizza Margherita với xúc xích Ý Mil",
                                              "price": 118800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000167###Half",
                                              "name": "(H) Pizza Magherita cà tím nướng",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000168###Half",
                                              "name": "(H) Pizza Cá hồi xốt kem miso",
                                              "price": 135000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000169###Half",
                                              "name": "(H) Pizza Hải sản xốt cà chua cay với p",
                                              "price": 129600,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016a###Half",
                                              "name": "(H) Pizza Tôm và xốt Mayonnaise",
                                              "price": 124200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016b###Half",
                                              "name": "(H) Pizza Gà xốt Teriyaki",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016c###Half",
                                              "name": "(H) Pizza Phô mai Camembert nhà làm và ",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc00016f###Half",
                                              "name": "(H) Pizza 4 loại nấm",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b9c31af540000fc000170###Half",
                                              "name": "(H) Pizza Rau cải xoăn kèm phô mai Rico",
                                              "price": 86400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "606458abfc7c0000e3007774###Half",
                                              "name": "(H) Pizza Cà ri gà kiểu Tandoori",
                                              "price": 108000,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  },
                                  {
                                      "id": "606458fefc7c0000e3007776-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e42###Topping",
                                              "name": "Xốt cà chua (45g)",
                                              "price": 16200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e43###Topping",
                                              "name": "Nấm (20g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "id": "5f30fe9195515c6642b4aebc",
                      "sequence": 9,
                      "name": "Market",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc000191",
                              "sequence": 93,
                              "name": "Phô mai Burrata nhà làm (75g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai nhà làm đặc trưng của 4P's, nổi bật với sự thơm béo",
                              "price": 54000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000192",
                              "sequence": 92,
                              "name": "Phô mai Burrata nhà làm (150g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai nhà làm đặc trưng của 4P's, nổi bật với sự thơm béo",
                              "price": 108000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000193",
                              "sequence": 91,
                              "name": "Phô mai Mozzarella (125g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella nhà làm",
                              "price": 71280,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100003.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000194",
                              "sequence": 90,
                              "name": "Phô mai xé sợi vị truyền thống (25g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Phô mai xé sợi nhà làm với vị nguyên bản",
                              "price": 20520,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000195",
                              "sequence": 89,
                              "name": "Phô mai xé sợi vị tiêu (25g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Phô mai xé sợi nhà làm với vị tiêu",
                              "price": 20520,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100005.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000196",
                              "sequence": 88,
                              "name": "Phô mai Camembert (125g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Camembert nhà làm với vị béo dịu nhẹ",
                              "price": 71280,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100006.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000197",
                              "sequence": 87,
                              "name": "Phô mai Camembert (250g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Camembert nhà làm với hương vị đậm đà",
                              "price": 138240,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88100007.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000198",
                              "sequence": 86,
                              "name": "Phô mai Scamorza hun khói (100g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella hun khói nhà làm",
                              "price": 75600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Smoked%20Scarmozza.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000199",
                              "sequence": 100,
                              "name": "Pudding kem trứng (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Bánh pudding nhà làm có kết cấu mềm, mùi vị dịu nhẹ của kem trứng",
                              "price": 28080,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/88100009.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00019a",
                              "sequence": 99,
                              "name": "Bánh matcha pudding (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Bánh pudding nhà làm hương vị trà xanh",
                              "price": 30240,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Matcha%20Pudding(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00019b",
                              "sequence": 98,
                              "name": "Sữa chua xốt dâu (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm với hương dâu ngọt ngào",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Berry%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019c",
                              "sequence": 97,
                              "name": "Sữa chua xốt chanh dây (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm mang vị chua ngọt hài hòa của chanh dây",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Passion%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019d",
                              "sequence": 96,
                              "name": "Sữa chua ít đường (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm ít đường, vị thanh nhẹ",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Low%20Sugar%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019e",
                              "sequence": 95,
                              "name": "Sữa chua không đường (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm nguyên bản không đường",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-No%20Sugar%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019f",
                              "sequence": 93,
                              "name": "Sữa chua kiểu Hy Lạp (90g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Sữa chua có kết cấu đặc, béo mịn với đặc trưng nguyên bản nhà làm",
                              "price": 38880,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Greek%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a0",
                              "sequence": 137,
                              "name": "Bia 4P’s Session IPA (4.5% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Với nồng độ cồn thấp, IPA được làm từ bột pizza của 4P's",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a1",
                              "sequence": 94,
                              "name": "Bia 4P’s Dalat Whey Stout (5.5% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Loại bia đen sản xuất theo hướng bền vững khi được làm từ nước whey",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300002.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a2",
                              "sequence": 135,
                              "name": "Bia 4P’s Premium Lager (5.5% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Dòng bia lager cổ điển là sự kết hợp lý tưởng với mọi món ăn",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc0001a3",
                              "sequence": 96,
                              "name": "Bia 4P’s KAGUA Roast (6.2% ABV)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Hương thơm độc đáo của tiêu Nhật Sansho và mạch nha rang",
                              "price": 82500,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88300005.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7b481f646d0000dc005f65",
                              "sequence": 500,
                              "name": "Mì Ý cua kem cà chua đông lạnh",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt kem béo cùng mùi thơm đậm đà từ thịt cua",
                              "price": 226800,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88200001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7b481f646d0000dc005f66",
                              "sequence": 500,
                              "name": "Mì Ý bolognese đông lạnh",
                              "availableStatus": "AVAILABLE",
                              "description": "Bò bằm với phô mai Scamorza nhà làm",
                              "price": 135000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88200002.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7b481f646d0000dc005f67",
                              "sequence": 501,
                              "name": "Mì Ý cà chua đông lạnh",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt cà chua với phô mai Mascarpone nhà làm",
                              "price": 129600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88200003.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7b481f646d0000dc005f68",
                              "sequence": 502,
                              "name": "Mì Ý Lasagna đông lạnh",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt bò, thịt heo, xốt cà chua và phô mai Mozzarella",
                              "price": 135000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88200004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7b481f646d0000dc005f69",
                              "sequence": 505,
                              "name": "Pizza salami milano đông lạnh",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt cà chua, lá quế tây và phô mai Mozzarella",
                              "price": 115560,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88200007.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7b481f646d0000dc005f6a",
                              "sequence": 506,
                              "name": "Pizza 4 phô mai đông lạnh",
                              "availableStatus": "AVAILABLE",
                              "description": "Vị thơm béo từ các loại phô mai nhà làm",
                              "price": 214000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/88200008.png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  },
                  {
                      "id": "5f30fe9195515c6642b4aebd",
                      "sequence": 6,
                      "name": "Tráng miệng",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc00018a",
                              "sequence": 50,
                              "name": "Bánh phô mai kép",
                              "availableStatus": "AVAILABLE",
                              "description": "Bánh phô mai hai lớp",
                              "price": 73440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/30000009.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000199",
                              "sequence": 100,
                              "name": "Pudding kem trứng (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Bánh pudding nhà làm có kết cấu mềm, mùi vị dịu nhẹ của kem trứng",
                              "price": 28080,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/88100009.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00019a",
                              "sequence": 99,
                              "name": "Bánh matcha pudding (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Bánh pudding nhà làm hương vị trà xanh",
                              "price": 30240,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Matcha%20Pudding(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00019b",
                              "sequence": 98,
                              "name": "Sữa chua xốt dâu (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm với hương dâu ngọt ngào",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Berry%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019c",
                              "sequence": 97,
                              "name": "Sữa chua xốt chanh dây (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm mang vị chua ngọt hài hòa của chanh dây",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Passion%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019d",
                              "sequence": 96,
                              "name": "Sữa chua ít đường (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm ít đường, vị thanh nhẹ",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Low%20Sugar%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019e",
                              "sequence": 95,
                              "name": "Sữa chua không đường (90g)",
                              "availableStatus": "AVAILABLE",
                              "description": "Sữa chua nhà làm nguyên bản không đường",
                              "price": 19440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-No%20Sugar%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c32af540000fc00019f",
                              "sequence": 93,
                              "name": "Sữa chua kiểu Hy Lạp (90g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Sữa chua có kết cấu đặc, béo mịn với đặc trưng nguyên bản nhà làm",
                              "price": 38880,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Retail/Retail-Greek%20Yogurt(90g).png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  },
                  {
                      "id": "5f744b6df91e00006c0014b6",
                      "sequence": 3,
                      "name": "Khai vị",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc000172",
                              "sequence": 100,
                              "name": "Thịt nguội cuộn lá Rocket và phô mai Ricotta (1 cuộn)",
                              "availableStatus": "AVAILABLE",
                              "description": "Cảm nhận sự tươi xanh và béo nhẹ",
                              "price": 41040,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000173",
                              "sequence": 98,
                              "name": "Phô mai Camembert kẹp Mascarpone dầu nấm Truffle (1 miếng)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Camembert, dầu nấm truffle, Mascarpone, hạt và phúc bồn tử",
                              "price": 36720,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000010.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000174",
                              "sequence": 97,
                              "name": "Khoai tây Đức bỏ lò",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Thịt heo muối xông khói, khoai tây, hành tây và hương thảo",
                              "price": 62640,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000013.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000176",
                              "sequence": 95,
                              "name": "Súp nghêu hầm",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Kem tươi, thịt heo, nghêu",
                              "price": 79920,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000043.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000177",
                              "sequence": 94,
                              "name": "Súp cà chua thịt viên Ý với phô mai Mascarpone",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Súp cà chua với rau củ và thịt viên Ý",
                              "price": 73440,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000045.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000178",
                              "sequence": 99,
                              "name": "Thịt nguội cuộn xoài kèm xốt chanh dây",
                              "availableStatus": "AVAILABLE",
                              "description": "Sự tươi ngọt của xoài và vị mặn mà của thịt nguội Ý Parma",
                              "price": 138240,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000006.png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  },
                  {
                      "id": "5f744bc7f91e00006c0014b7",
                      "sequence": 4,
                      "name": "Salad",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc00017c",
                              "sequence": 50,
                              "name": "Phô mai Burrata kèm lá Rocket và Cà chua Salad",
                              "availableStatus": "AVAILABLE",
                              "description": "Với xốt giấm Balsamic hoặc xốt thì là, hạt",
                              "price": 187920,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100001.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00017c-Dressing",
                                      "name": "Dressing",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b999baf540000fc000146###Dressing",
                                              "name": "Xốt giấm Balsamic",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000147###Dressing",
                                              "name": "Xốt quế tây và tỏi",
                                              "price": 10800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000148###Dressing",
                                              "name": "Xốt thì là ngọt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769b###Dressing",
                                              "name": "Không nước xốt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00017d",
                              "sequence": 50,
                              "name": "Lá Rocket và Cà chua Salad",
                              "availableStatus": "AVAILABLE",
                              "description": "Với xốt giấm Balsamic hoặc xốt thì là, hạt",
                              "price": 79920,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100002.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00017d-Dressing",
                                      "name": "Dressing",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b999baf540000fc000146###Dressing",
                                              "name": "Xốt giấm Balsamic",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000147###Dressing",
                                              "name": "Xốt quế tây và tỏi",
                                              "price": 10800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000148###Dressing",
                                              "name": "Xốt thì là ngọt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769b###Dressing",
                                              "name": "Không nước xốt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00017e",
                              "sequence": 96,
                              "name": "Phô mai Mozzarella nhà làm và cà chua Đà Lạt Salad",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella tươi và cà chua",
                              "price": 101520,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100003.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00017f",
                              "sequence": 100,
                              "name": "Phô mai Burrata kèm thịt nguội và trái cây nhiệt đới Salad (nhỏ)",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt thì là, xoài, bưởi, dưa hấu và thanh long",
                              "price": 129600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000180",
                              "sequence": 99,
                              "name": "Phô mai Burrata kèm thịt nguội và trái cây nhiệt đới Salad (lớn)",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt thì là, xoài, bưởi, dưa hấu và thanh long",
                              "price": 237600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100005.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000181",
                              "sequence": 97,
                              "name": "Rau xanh với xốt tự chế biến Salad",
                              "availableStatus": "AVAILABLE",
                              "description": "Sự tươi mát từ 7 loại rau và 4 loại rau mùi",
                              "price": 81000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100008.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000181-Dressing",
                                      "name": "Dressing",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b999baf540000fc000144###Dressing",
                                              "name": "Xốt mật ong mù tạt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000146###Dressing",
                                              "name": "Xốt giấm Balsamic",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000147###Dressing",
                                              "name": "Xốt quế tây và tỏi",
                                              "price": 10800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000148###Dressing",
                                              "name": "Xốt thì là ngọt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000149###Dressing",
                                              "name": "Xốt kem sữa whey",
                                              "price": 0,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769b###Dressing",
                                              "name": "Không nước xốt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000182",
                              "sequence": 98,
                              "name": "Tôm Bơ Salad",
                              "availableStatus": "AVAILABLE",
                              "description": "Rau rocket, đậu Hà Lan, cần tây và cà chua",
                              "price": 105840,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100012.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000182-Dressing",
                                      "name": "Dressing",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 1,
                                      "selectionRangeMax": 1,
                                      "modifiers": [
                                          {
                                              "id": "5f5b999baf540000fc000145###Dressing",
                                              "name": "Xốt chanh",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000146###Dressing",
                                              "name": "Xốt giấm Balsamic",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5b999baf540000fc000147###Dressing",
                                              "name": "Xốt quế tây và tỏi",
                                              "price": 10800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769b###Dressing",
                                              "name": "Không nước xốt",
                                              "price": 0,
                                              "availableStatus": "AVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "id": "5f744bf2f91e00006c0014b8",
                      "sequence": 5,
                      "name": "Món Chính/ Mì Ý",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc000183",
                              "sequence": 198,
                              "name": "Mì Ý xốt kem với cua và xốt cà chua",
                              "availableStatus": "AVAILABLE",
                              "description": "Nước xốt kem béo thơm cùng vị cua đậm đà",
                              "price": 251640,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000184",
                              "sequence": 98,
                              "name": "Mì Ý nghêu và xốt quế tây",
                              "availableStatus": "AVAILABLE",
                              "description": "Nghêu, húng tây, hạt và phô mai Grana Padano",
                              "price": 162000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200003.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000185",
                              "sequence": 97,
                              "name": "Mì Ý bò bằm và phô mai hun khói nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt bò, thịt heo, xốt cà chua, phô mai Mozzarella hun khói, Grana Padano",
                              "price": 162000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200005.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000186",
                              "sequence": 96,
                              "name": "Mì Fettuccine nhà làm kèm xốt kem cá hồi",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt kem béo đậm đà cùng cá hồi và tiêu hồng",
                              "price": 187920,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200009.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000187",
                              "sequence": 99,
                              "name": "Mì Ý xốt cà chua với phô mai Mascarpone nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Ớt, xốt cà chua, phô mai Mascarpone và Grana Padano",
                              "price": 151200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200013.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000188",
                              "sequence": 94,
                              "name": "Mì Lasagna đút lò kèm phô mai Mozzarella nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt bò, thịt heo, xốt Béchamel, xốt cà chua, phô mai Mozzarella",
                              "price": 159840,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200015.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000189",
                              "sequence": 95,
                              "name": "Mì Fettuccine nhà làm kèm xốt kem tôm, nấm và măng tây",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt húng tây đậm đà cùng nước hầm thịt và hạt",
                              "price": 192240,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200016.png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  },
                  {
                      "id": "5f7ee001865100006400136a",
                      "sequence": 8,
                      "name": "Thêm Topping",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f7ee1e3865100006400136b",
                              "sequence": 90,
                              "name": "Xốt mật ong mù tạt",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt nhà làm với vị mật ong dịu nhẹ và mù tạc",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping%20Honey%20mustard.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7ee1e3865100006400136c",
                              "sequence": 91,
                              "name": "Xốt chanh",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt chanh nhà làm có vị chua và tươi mới",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping-Lemon%20Dressing.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7ee1e3865100006400136d",
                              "sequence": 92,
                              "name": "Xốt giấm Balsamic",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt giấm balsamic béo ngậy và dịu nhẹ",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping-Balsamic%20Dressing.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7ee1e3865100006400136e",
                              "sequence": 96,
                              "name": "Xốt quế tây và tỏi",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt nhà làm với quế tây, cá cơm, giấm và tỏi",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping-%20Basil%20_%20Garlic%20Dressing.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7ee1e3865100006400136f",
                              "sequence": 95,
                              "name": "Xốt thì là ngọt",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt ngọt thoảng hương hạt thì là",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping%20Fennel%20Dressing.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7ee1e38651000064001370",
                              "sequence": 94,
                              "name": "Xốt kem sữa whey",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Xốt kem sữa whey",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping-Whey%20milk%20Dressing.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7ee1e38651000064001371",
                              "sequence": 93,
                              "name": "Xốt tương đậu nành",
                              "availableStatus": "AVAILABLE",
                              "description": "",
                              "price": 27000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Topping/Topping%20Japanese.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7eeb928651000064001372",
                              "sequence": 99,
                              "name": "Phô mai Burrata nhà làm (75g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Phô mai nhà làm đặc trưng của 4P's, nổi bật với sự thơm béo",
                              "price": 54000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/50000067.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7eeb928651000064001373",
                              "sequence": 100,
                              "name": "Phô mai Burrata nhà làm (150g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Phô mai nhà làm đặc trưng của 4P's, nổi bật với sự thơm béo",
                              "price": 108000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/50000067.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7eeb928651000064001374",
                              "sequence": 97,
                              "name": "Phô mai Mozzarella (50g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Phô mai Mozzarella nhà làm",
                              "price": 43200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/50000007.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f7eeb928651000064001375",
                              "sequence": 98,
                              "name": "Phô mai Mozzarella (90g)",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Phô mai Mozzarella nhà làm",
                              "price": 64800,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/50000007.png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  },
                  {
                      "id": "60b1ace0b66a000048006073",
                      "sequence": 2,
                      "name": "Mới & Gợi ý",
                      "availableStatus": "AVAILABLE",
                      "items": [
                          {
                              "id": "5f5b9c31af540000fc00014d",
                              "sequence": 140,
                              "name": "Phô mai Burrata Margherita thịt nguội Pizza",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Xốt cà chua cùng phô mai Burrata và thịt nguội Ý Parma",
                              "price": 421200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000003.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00014d-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00014f",
                              "sequence": 138,
                              "name": "4 loại phô mai nhà làm Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano, Camembert và phô mai xanh",
                              "price": 259200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000006%20-%204%20Cheese%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00014f-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000150",
                              "sequence": 139,
                              "name": "5 loại phô mai nhà làm Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Mozzarella, Grano Padano, Camembert, Raclette và phô mai xanh",
                              "price": 302400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000007%20-%205%20Cheese%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000150-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000153",
                              "sequence": 134,
                              "name": "Margherita với xúc xích Ý Milano và xúc xích cay Chorizo Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Xúc xích Ý Milano và Chorizo với xốt cà chua",
                              "price": 237600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000010.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000153-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000154",
                              "sequence": 125,
                              "name": "Cà tím nướng Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay, cà tím với xốt giấm Balsamic và xốt cà chua",
                              "price": 194400,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000011%20-%20Eggplant%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000154-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000155",
                              "sequence": 131,
                              "name": "Cá hồi xốt kem miso Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Cá hồi với miso ngọt và xốt kem béo thơm",
                              "price": 270000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000013%20-%20Salmon%20Miso%20Cream%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000155-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000156",
                              "sequence": 132,
                              "name": "Hải sản xốt cà chua cay với phô mai hun khói Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Tôm, mực, nghêu, phô mai hun khói và xốt cà chua",
                              "price": 259200,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000014.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000156-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000158",
                              "sequence": 130,
                              "name": "Gà xốt Teriyaki Pizza",
                              "availableStatus": "AVAILABLE",
                              "description": "Gà xốt nước tương ngọt với rong biển, lá tía tô và mayonnaise",
                              "price": 216000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10000017%20-%20Teriyaki%20Chicken%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc000158-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc00015d",
                              "sequence": 127,
                              "name": "Rau cải xoăn kèm phô mai Ricotta chanh nhà làm với xốt ô liu và nụ bạch hoa Piz",
                              "availableStatus": "AVAILABLE",
                              "description": "Món chay",
                              "price": 172800,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/Pizza/10004067%20-%20Vegetarian%20Kale%20Pizza.png"
                              ],
                              "modifierGroups": [
                                  {
                                      "id": "5f5b9c31af540000fc00015d-Topping",
                                      "name": "Topping",
                                      "availableStatus": "AVAILABLE",
                                      "selectionRangeMin": 0,
                                      "selectionRangeMax": 8,
                                      "modifiers": [
                                          {
                                              "id": "5f5db7002b2b0000a2004e44###Topping",
                                              "name": "Thịt nguội (50g)",
                                              "price": 97200,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e45###Topping",
                                              "name": "Xốt cà chua (90g)",
                                              "price": 32400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e46###Topping",
                                              "name": "Nấm (40g)",
                                              "price": 64800,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f5db7002b2b0000a2004e47###Topping",
                                              "name": "Thịt nguội (100g)",
                                              "price": 194400,
                                              "availableStatus": "AVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007697###Topping",
                                              "name": "Phô mai Burrata nhà làm (75g)",
                                              "price": 54000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007698###Topping",
                                              "name": "Phô mai Burrata nhà làm (150g)",
                                              "price": 108000,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf77000043007699###Topping",
                                              "name": "Phô mai Mozzarella (50g)",
                                              "price": 43200,
                                              "availableStatus": "UNAVAILABLE"
                                          },
                                          {
                                              "id": "5f6232c0cf7700004300769a###Topping",
                                              "name": "Phô mai Mozzarella (90g)",
                                              "price": 64800,
                                              "availableStatus": "UNAVAILABLE"
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "id": "5f5b9c31af540000fc000172",
                              "sequence": 100,
                              "name": "Thịt nguội cuộn lá Rocket và phô mai Ricotta (1 cuộn)",
                              "availableStatus": "AVAILABLE",
                              "description": "Cảm nhận sự tươi xanh và béo nhẹ",
                              "price": 41040,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000173",
                              "sequence": 98,
                              "name": "Phô mai Camembert kẹp Mascarpone dầu nấm Truffle (1 miếng)",
                              "availableStatus": "AVAILABLE",
                              "description": "Phô mai Camembert, dầu nấm truffle, Mascarpone, hạt và phúc bồn tử",
                              "price": 36720,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000010.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000174",
                              "sequence": 97,
                              "name": "Khoai tây Đức bỏ lò",
                              "availableStatus": "UNAVAILABLE",
                              "description": "Thịt heo muối xông khói, khoai tây, hành tây và hương thảo",
                              "price": 62640,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000013.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000178",
                              "sequence": 99,
                              "name": "Thịt nguội cuộn xoài kèm xốt chanh dây",
                              "availableStatus": "AVAILABLE",
                              "description": "Sự tươi ngọt của xoài và vị mặn mà của thịt nguội Ý Parma",
                              "price": 138240,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20000006.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc00017f",
                              "sequence": 100,
                              "name": "Phô mai Burrata kèm thịt nguội và trái cây nhiệt đới Salad (nhỏ)",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt thì là, xoài, bưởi, dưa hấu và thanh long",
                              "price": 129600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100004.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000180",
                              "sequence": 99,
                              "name": "Phô mai Burrata kèm thịt nguội và trái cây nhiệt đới Salad (lớn)",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt thì là, xoài, bưởi, dưa hấu và thanh long",
                              "price": 237600,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20100005.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000183",
                              "sequence": 198,
                              "name": "Mì Ý xốt kem với cua và xốt cà chua",
                              "availableStatus": "AVAILABLE",
                              "description": "Nước xốt kem béo thơm cùng vị cua đậm đà",
                              "price": 251640,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200001.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000185",
                              "sequence": 97,
                              "name": "Mì Ý bò bằm và phô mai hun khói nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt bò, thịt heo, xốt cà chua, phô mai Mozzarella hun khói, Grana Padano",
                              "price": 162000,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200005.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000186",
                              "sequence": 96,
                              "name": "Mì Fettuccine nhà làm kèm xốt kem cá hồi",
                              "availableStatus": "AVAILABLE",
                              "description": "Xốt kem béo đậm đà cùng cá hồi và tiêu hồng",
                              "price": 187920,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200009.png"
                              ],
                              "modifierGroups": []
                          },
                          {
                              "id": "5f5b9c31af540000fc000188",
                              "sequence": 94,
                              "name": "Mì Lasagna đút lò kèm phô mai Mozzarella nhà làm",
                              "availableStatus": "AVAILABLE",
                              "description": "Thịt bò, thịt heo, xốt Béchamel, xốt cà chua, phô mai Mozzarella",
                              "price": 159840,
                              "photos": [
                                  "https://storage.googleapis.com/delivery-system-v2/02-06-2021%20Image/20200015.png"
                              ],
                              "modifierGroups": []
                          }
                      ]
                  }
              ]
          }
      ]
  };
    return payload;
  }
}
