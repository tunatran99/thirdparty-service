import { readConnection } from '@libs/database.module';
import { FindCategoryByCodesResult } from 'src/shopeefood/application/query/find.category.bycodes.result';
import { CategoryEntity } from '../entity/category';
import { CategoryQuery } from './category.query';
import { MenuEntity } from 'src/populate/infratsructure/entity/menu';

export class CategoryQueryImplement implements CategoryQuery {
  async selectStoreRecords(id: number): Promise<FindCategoryByCodesResult> {
    let sql = readConnection
      .getRepository(MenuEntity)
      .createQueryBuilder('t1')
      .addSelect('t1.storeId', 'id')
      .addSelect('t2.STORE_NAME', 'name')
      .innerJoin('store', 't2', 't1.storeId = t2.STORE_ID')
      .addSelect(
        `json_arrayagg(t1.Category_ID)`,
        'cates',
      )
      .where('t1.storeId in (1001)');
    const data = await sql.getRawOne();

    const cateData = await this.selectCateRecords(data.cates);
    return {
      section: {
        id: data.id,
        name: data.name + ' menu',
        serviceHours: {
          "mon": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          },
          "tue": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          },
          "wed": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          },
          "thu": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          },
          "fri": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          },
          "sat": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          },
          "sun": {
            "openPeriodType": "OpenPeriod",
            "periods": [
              {
                "startTime": "08:00",
                "endTime": "20:00"
              }
            ]
          }
        },
        categories: cateData,
      }
    };
  }

  async selectCateRecords(cates: string[]): Promise<any> {
    let sql = readConnection
      .getRepository(MenuEntity)
      .createQueryBuilder('t1')
      .addSelect('t1.Category_ID', 'id')
      .addSelect('t1.Category_Name_Level_2', 'name')
      .addSelect(
        `json_arrayagg(
          json_object(
            "id", t1.SKU,
            "name", t1.productName,
            "availableStatus", t1.DELETED,
            "description", t1.description,
            "price", t1.price
          )
        )`,
        'items',
      )
      .where(`t1.Category_ID in (${cates.join(', ')})`);
    const data = await sql.groupBy('t1.Category_ID').getRawMany();
    return data.map(i => {
      return {
        id: i.id,
        sequence: null,
        name: i.name,
        availableStatus: i.availableStatus ?? null,
        items: i.items.map(k => {
          return {
            id: k.id,
            sequence: null,
            name: k.name,
            availableStatus: k.availableStatus === 0 ? "AVAILABLE" : "UNAVAILABLE",
            description: k.description,
            price: parseInt(k.price),
            photos: []
          }
        })
      }
    });
  }
}
