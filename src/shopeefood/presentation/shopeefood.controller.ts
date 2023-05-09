import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';

@Controller('shopeefood')
export class ShopeefoodController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  // @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Post('menu')
  async downloadSuppliers(@Body('restaurant_id') restaurant_id: string): Promise<string> {
    return "From FPT";
  }
}
