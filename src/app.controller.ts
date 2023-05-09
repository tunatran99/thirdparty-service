import { Controller, Get, UseGuards } from '@nestjs/common';
import ApiKeyAuthenticationGuard from './user/authentication/apikey.guard';

@Controller()
export class AppController {
  @Get('ping')
  ping(): string {
    return 'OK';
  }

  @Get('test')
  @UseGuards(ApiKeyAuthenticationGuard)
  test(): string {
    return 'OK';
  }
}
