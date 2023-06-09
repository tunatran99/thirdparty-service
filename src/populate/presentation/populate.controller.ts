import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateData } from '../application/command/create.data.command';

@Controller('populate')
export class PopulateController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async UploadSKUData(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const command = new CreateData(file);
    return await this.commandBus.execute(command);
  }
}
