import { Body, Controller, Get, HttpCode, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import ApiKeyAuthenticationGuard from 'src/shopeefood/authentication/apikey.guard';
import { FindCategoryByCodesQuery } from '../application/query/find.category.bycodes.query';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateData } from 'src/shopeefood/application/command/create.data.command';
import { CreateCategory } from 'src/shopeefood/application/command/create.category.command';
import { FindCategoryQuery } from '../application/query/find.category.query';
import { SearchDTO } from './dto/common.dto';
import { CreateDTO } from './dto/create.category.dto';
import { FindCategoryByCodesTestQuery } from '../application/query/find.category.bycodes.test.query';

@Controller('shopeefood')
export class ShopeefoodController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @UseGuards(ApiKeyAuthenticationGuard)
  @HttpCode(200)
  @Get('merchant/menu')
  async getMenu(@Query('partnerMerchantID') id: string): Promise<any> {
    let payload = {
      "partnerMerchantID": `${id}`,
      "section": {}
    };

    const { section } = await this.queryBus.execute(new FindCategoryByCodesQuery(id));
    payload.section = section;

    return payload;
  }

  @Get('merchant/menutest')
  async getMenuTest(@Query('partnerMerchantID') id: string): Promise<any> {
    let payload = {
      "partnerMerchantID": `${id}`,
      "section": {}
    };

    const { section } = await this.queryBus.execute(new FindCategoryByCodesTestQuery(id));
    payload.section = section;

    return payload;
  }

  @Get('category')
  async GetCategory(@Query() query: SearchDTO): Promise<void> {
    const q = new FindCategoryQuery(query);
    return await this.queryBus.execute(q);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadSKUData(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const command = new CreateData(file);
    return await this.commandBus.execute(command);
  }

  @Post('category/upload')
  @UseInterceptors(FileInterceptor('file'))
  async UploadCategoryData(@UploadedFile() file: Express.Multer.File, @Body() body: CreateDTO): Promise<void> {
    const command = new CreateCategory(file, body);
    return await this.commandBus.execute(command);
  }
}
