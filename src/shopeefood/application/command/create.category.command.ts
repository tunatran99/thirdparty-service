import { ICommand } from '@nestjs/cqrs';

export class CreateCategory implements ICommand {
  constructor(readonly excelFile: Express.Multer.File) {
    Object.assign(this, excelFile);
  }
}
