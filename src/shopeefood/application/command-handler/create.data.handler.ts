import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { IData } from 'src/shopeefood/domain/data';
import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { DataRepositoryImplement } from 'src/shopeefood/infratsructure/repository/data.repository.implement';
import * as xlsx from 'xlsx';
import * as exceljs from 'exceljs'
import { CreateData } from '../command/create.data.command';
import { readConnection } from '@libs/database.module';
import { DataFactory } from 'src/shopeefood/domain/data.factory';

@CommandHandler(CreateData)
export class CreateDataHandler implements ICommandHandler<CreateData, number> {
  @Inject()
  private readonly DataRepo: DataRepositoryImplement;
  @Inject() private readonly dataFactory: DataFactory;

  @Transactional()
  async execute(data: CreateData): Promise<number> {
    if (!data.excelFile) {
      return 0;
    }
    else {
      const workbook = xlsx.read(data.excelFile.buffer)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData: any = xlsx.utils.sheet_to_json(worksheet);
      const entities = [];

      for (const data of excelData) {
        let cateId: number, skuId: number, stores: string[];
        if (data.CATEGORY) cateId = await this.DataRepo.findCategoryIdByCode(data.CATEGORY);
        if (data.SKU) skuId = await this.DataRepo.findSkuIdByCode(data.SKU);
        if (data.STORE.toString().includes(',')) stores = data.STORE.split(',');

        const index = entities.findIndex(i => i.SKU_ID === skuId)

        if (index == -1) {
          if (stores && stores.length > 1) {
            for (let store of stores) {
              store = store.trim();
              const menu = await this.DataRepo.findBySkuId(skuId, store);
              if (menu) {
                menu.model.update({
                  CATEGORY_ID: cateId ?? (data.CATEGORY ? parseInt(data.CATEGORY) : null),
                  SKU_ID: skuId ?? (data.SKU ? parseInt(data.SKU) : null),
                  STORE: store,
                  DESCRIPTION: data.DESCRIPTION,
                  STATUS: parseInt(data.STATUS),
                  SKU_IMAGE: data.SKU_IMAGE,
                  SEQUENCE: data.SEQUENCE,
                  SPF_DISH_ID: data.SPF_DISH_ID ? data.SPF_DISH_ID : null
                });

                await this.DataRepo.save(menu.model);

                menu.model.commit();
              }
              else {
                const newMenu = this.dataFactory.create({
                  CATEGORY_ID: cateId ?? (data.CATEGORY ? parseInt(data.CATEGORY) : null),
                  SKU_ID: skuId ?? (data.SKU ? parseInt(data.SKU) : null),
                  STORE: store,
                  DESCRIPTION: data.DESCRIPTION,
                  STATUS: data.STATUS,
                  SKU_IMAGE: data.SKU_IMAGE,
                  SEQUENCE: data.SEQUENCE,
                  SPF_DISH_ID: data.SPF_DISH_ID
                });

                newMenu.create();

                await this.DataRepo.save(newMenu);

                newMenu.commit();
              }
            }
          }
          else {
            const menu = await this.DataRepo.findBySkuId(skuId, data.STORE);
              if (menu) {
                menu.model.update({
                  CATEGORY_ID: cateId ?? (data.CATEGORY ? parseInt(data.CATEGORY) : null),
                  SKU_ID: skuId ?? (data.SKU ? parseInt(data.SKU) : null),
                  STORE: data.STORE,
                  DESCRIPTION: data.DESCRIPTION,
                  STATUS: parseInt(data.STATUS),
                  SKU_IMAGE: data.SKU_IMAGE,
                  SEQUENCE: data.SEQUENCE,
                  SPF_DISH_ID: data.SPF_DISH_ID ? data.SPF_DISH_ID : null
                });

                await this.DataRepo.save(menu.model);

                menu.model.commit();
              }
              else {
                const newMenu = this.dataFactory.create({
                  CATEGORY_ID: cateId ?? (data.CATEGORY ? parseInt(data.CATEGORY) : null),
                  SKU_ID: skuId ?? (data.SKU ? parseInt(data.SKU) : null),
                  STORE: data.STORE,
                  DESCRIPTION: data.DESCRIPTION,
                  STATUS: data.STATUS,
                  SKU_IMAGE: data.SKU_IMAGE,
                  SEQUENCE: data.SEQUENCE,
                  SPF_DISH_ID: data.SPF_DISH_ID
                });

                newMenu.create();

                await this.DataRepo.save(newMenu);

                newMenu.commit();
              }
          }
        }
      }

      return 1;
    }
  }
}
