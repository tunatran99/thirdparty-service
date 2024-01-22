import { ICommand } from '@nestjs/cqrs';
import { CreateDTO } from 'src/shopeefood/presentation/dto/create.category.dto';

export class CreateCategory implements ICommand {
  constructor(readonly excelFile?: Express.Multer.File, readonly body?: CreateDTO) {}
}
