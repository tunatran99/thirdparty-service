import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { IData } from 'src/shopeefood/domain/data';
import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { DataRepositoryImplement } from 'src/shopeefood/infratsructure/repository/data.repository.implement';
import * as xlsx from 'xlsx';
import * as exceljs from 'exceljs'
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
      // console.log(data.excelFile.filename)
      // let wb = new exceljs.Workbook();
      // wb = await wb.xlsx.read(data.excelFile.stream)
      // let ws = wb.getWorksheet('SKU')
      // ws.eachRow((row, rowNumber) => row.eachCell(async (cell, colNumber) => {
      //   if (cell.name === 'CATEGORY') {
      //     const rows = ws.getRows(rowNumber+1, ws.rowCount)
      //     const entities = rows.map(row => {
      //       const entity = new MenuEntity();
      //       entity.CATEGORY = row.values[1];
      //       entity.SKU = row.values[2];
      //       entity.STORE = row.values[3];
      //       entity.DESCRIPTION = row.values[5];
      //       entity.STATUS = row.values[6];
      //       entity.SKU_IMAGE = row.values[7];
      //       entity.SEQUENCE = row.values[4];
      //       return entity;
      //     })

      //     await this.DataRepo.save(entities);
      //   }
      // }))

      const workbook = xlsx.read(data.excelFile.buffer)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData: IData[] = xlsx.utils.sheet_to_json(worksheet);

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
