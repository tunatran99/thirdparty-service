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
        const [cateId, skuId] = await Promise.all([
          this.DataRepo.findCategoryIdByCode(data.CATEGORY),
          this.DataRepo.findSkuIdByCode(data.SKU)
        ]);

        const index = entities.findIndex(i => i.SKU_ID === skuId)

        if (index == -1) {
          const menu = await this.DataRepo.findBySkuId(skuId, data.STORE);
          if (menu) {
            menu.model.update({
              CATEGORY_ID: cateId ?? parseInt(data.CATEGORY),
              SKU_ID: skuId ?? parseInt(data.SKU),
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
              CATEGORY_ID: cateId ?? parseInt(data.CATEGORY),
              SKU_ID: skuId ?? parseInt(data.SKU),
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
          // const entity = readConnection.getRepository(MenuEntity).create({
          //   CATEGORY_ID: cateId ?? parseInt(data.CATEGORY),
          //   SKU_ID: skuId ?? parseInt(data.SKU),
          //   STORE: data.STORE,
          //   DESCRIPTION: data.DESCRIPTION,
          //   STATUS: data.STATUS,
          //   SKU_IMAGE: data.SKU_IMAGE,
          //   SEQUENCE: data.SEQUENCE,
          //   SPF_DISH_ID: data.SPF_DISH_ID
          // });
          // const entity = new MenuEntity();
          // entity.CATEGORY_ID = cateId ?? parseInt(data.CATEGORY);
          // entity.SKU_ID = skuId ?? parseInt(data.SKU);
          // entity.STORE = data.STORE;
          // entity.DESCRIPTION = data.DESCRIPTION;
          // entity.STATUS = data.STATUS;
          // entity.SKU_IMAGE = data.SKU_IMAGE;
          // entity.SEQUENCE = data.SEQUENCE;

          // entities.push(entity)
        }
      }

      // excelData.forEach(async (item) => {
      //   const [cateId, skuId, storeId] = await Promise.all([
      //     this.DataRepo.findCategoryIdByCode(item.CATEGORY),
      //     this.DataRepo.findSkuIdByCode(item.SKU),
      //     this.DataRepo.findStoreIdByCode(item.STORE)
      //   ]);

      //   const entity = new MenuEntity();
      //   entity.CATEGORY_ID = cateId;
      //   entity.SKU_ID = skuId;
      //   entity.STORE_ID = storeId;
      //   entity.DESCRIPTION = item.DESCRIPTION;
      //   entity.STATUS = item.STATUS;
      //   entity.SKU_IMAGE = item.SKU_IMAGE;
      //   entity.SEQUENCE = item.SEQUENCE;

      //   entities.push(entity)
      // });

      // await this.DataRepo.save(entities);

      return 1;
    }
  }
}
