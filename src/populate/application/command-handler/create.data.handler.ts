import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { IData } from 'src/populate/domain/data';
import { MenuEntity } from 'src/populate/infratsructure/entity/menu';
import { DataRepositoryImplement } from 'src/populate/infratsructure/repository/data.repository.implement';
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
        entity.Category_ID = item.Category_ID;
        entity.Category_Name_Level_1 = item.Category_Name_Level_1;
        entity.Category_Name_Level_2 = item.Category_Name_Level_2;
        entity.Category_Name_Level_3 = item.Category_Name_Level_3;
        entity.SKU = item.SKU;
        entity.productName = item.productName;
        entity.UOM = item.UOM;
        entity.price = item.price;
        entity.promoPrice = item.promoPrice;
        entity.storeId = item.storeId;
        entity.description = item.description;
        entity.DELETED = item.DELETED;
        return entity;
      });

      const savedItems = await this.DataRepo.save(entities);

      return 1;
    }
  }
}
