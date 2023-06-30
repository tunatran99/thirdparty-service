import { readConnection } from '@libs/database.module';
import { CategoryQuery } from './category.query';
import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryQueryImplement implements CategoryQuery {
  async selectStoreRecords(id: number): Promise<any> {
    let sql = readConnection
      .getRepository(MenuEntity)
      .createQueryBuilder('t1')
      .addSelect('t1.STORE', 'id')
      .addSelect('t2.STORE_NAME', 'name')
      .innerJoin('store', 't2', 't1.STORE = t2.STORE_ID')
      .addSelect(
        `json_arrayagg(t1.CATEGORY)`,
        'cates',
      )
      .where(`t1.STORE in (${id})`);
    const data = await sql.getRawOne();

    if(!data.cates) {
      throw new HttpException(`Không tồn tại cửa hàng này`, HttpStatus.BAD_REQUEST)
    }

    const cates = data.cates.filter((i, index) => data.cates[index] != data.cates[index+1])

    const cateData = await this.selectCateRecords(cates, id);
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

  async selectCateRecords(cates: string[], store: number): Promise<any> {
    // let endpoint = 'http://20.239.69.167/pop-services-test/'
    let sql = readConnection
    // .query(`select t1.Category_ID as id, t2.CATEGORY_NAME as name, t2.STATUS as availableStatus, 
    // t2.SEQUENCE as sequence, json_arrayagg(
    //   json_object(
    //     "id", t1.SKU,
    //     "name", t1.productName,
    //     "availableStatus", t1.DELETED,
    //     "description", t1.description,
    //     "normalPrice", t3.normalPrice,
    //     "promoPrice", t3.promoPrice,
    //     "filePath", t1.SKU_IMAGE
    //   )
    // ) AS items 
    // from spf_menu t1 JOIN spf_category t2 ON t1.Category_ID = t2.CATEGORY_CODE 
    // JOIN ps_price t3 on t1.SKU = t3.sku 
    // WHERE t1.Category_ID in (${cates?.join(', ')})
    // GROUP BY t1.Category_ID`)
      .getRepository(MenuEntity)
      .createQueryBuilder('t1')
      .addSelect('t1.CATEGORY', 'id')
      .addSelect('t2.CATEGORY_NAME', 'name')
      .addSelect('t2.STATUS', 'availableStatus')
      .addSelect('t2.SEQUENCE', 'sequence')
      .leftJoin('spf_category', 't2', 't1.CATEGORY = t2.CATEGORY_CODE')
      .innerJoin('sku', 't3', 't1.SKU = t3.SKU_CODE')
      .innerJoin('ps_price', 't4', '(t1.SKU = t4.sku and t1.STORE = t4.store)')
      .addSelect(
        `json_arrayagg(
          json_object(
            "id", t1.SKU,
            "name", t3.ITEM_DESC_VNM,
            "availableStatus", t1.STATUS,
            "sequence", t1.SEQUENCE,
            "description", t1.description,
            "promoPrice", t4.promoPrice,
            "normalPrice", t4.normalPrice,
            "filePath", t1.SKU_IMAGE
          )
        )`,
        'items',
      )
      .where(`t1.CATEGORY in (${cates?.join(', ')}) and t1.STORE in (${store})`);
      console.log(sql.groupBy('t1.CATEGORY').getQuery());
    const data = await sql.groupBy('t1.CATEGORY').getRawMany();
    return data.map((i, index) => {
      return {
        id: i.id,
        sequence: i.sequence,
        name: i.name,
        availableStatus: i.availableStatus ?? "AVAILABLE",
        items: i.items.map((k, index) => {
          return {
            id: k.id,
            sequence: k.sequence,
            sort_type: 1,
            name: k.name,
            availableStatus: k.availableStatus === 0 ? "AVAILABLE" : "UNAVAILABLE",
            description: k.description,
            price: k.promoPrice ?? k.normalPrice ?? 300000,
            photos: k.filePath
          }
        })
      }
    });
  }
}
