import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { IData } from 'src/shopeefood/domain/data';
import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { DataRepositoryImplement } from 'src/shopeefood/infratsructure/repository/data.repository.implement';
import * as xlsx from 'xlsx';
import { CreateData } from '../command/create.data.command';

@CommandHandler(CreateData)
export class CreateDataHandler implements ICommandHandler<CreateData, number> {
  @Inject()
  private readonly DataRepo: DataRepositoryImplement;

  @Transactional()
  async execute(data: CreateData): Promise<number> {
    if (!data.excelFile) {
      return 0;
    }
    else {
      const workbook = xlsx.read(data.excelFile.buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData: IData[] = xlsx.utils.sheet_to_json(worksheet);
      // console.log(excelData)

      const entities = excelData.map((item) => {
        const entity = new MenuEntity();
        entity.CATEGORY = item.CATEGORY;
        entity.SKU = item.SKU;
        entity.STORE = item.STORE;
        entity.DESCRIPTION = item.DESCRIPTION;
        entity.STATUS = item.STATUS;
        entity.SKU_IMAGE = item.SKU_IMAGE;
        entity.SEQUENCE = item.SEQUENCE;
        return entity;
      });

      const savedItems = await this.DataRepo.save(entities);

      return 1;
    }
  }
}
