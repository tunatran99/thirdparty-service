import { Controller, Get, HttpCode, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import ApiKeyAuthenticationGuard from 'src/user/authentication/apikey.guard';
import { FindCategoryByCodesQuery } from '../application/query/find.category.bycodes.query';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateData } from 'src/shopeefood/application/command/create.data.command';
import { CreateCategory } from 'src/shopeefood/application/command/create.category.command';

@Controller('shopeefood')
export class ShopeefoodController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Get('merchant/menu')
  async getMenu(@Query('partnerMerchantID') id: number): Promise<any> {
    let payload = {
      "merchantID": "",
      "partnerMerchantID": `${id}`,
      "section": {}
  };

  const { section } = await this.queryBus.execute(new FindCategoryByCodesQuery(id));
  payload.section = section;
  
    return payload;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadSKUData(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const command = new CreateData(file);
    return await this.commandBus.execute(command);
  }

  @Post('category/upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadCategoryData(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const command = new CreateCategory(file);
    return await this.commandBus.execute(command);
  }
}
