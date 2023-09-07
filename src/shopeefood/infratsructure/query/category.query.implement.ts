import { readConnection } from '@libs/database.module';
import { CategoryQuery } from './category.query';
import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryQueryImplement implements CategoryQuery {
  async selectStoreRecords(id: string): Promise<any> {
    if(id !== "1009") {
      throw new HttpException({ message: `Không thể truy cập cửa hàng này` }, HttpStatus.BAD_REQUEST)
    }
    
    let sql = readConnection
      .getRepository(MenuEntity)
      .createQueryBuilder('t1')
      .select('t1.STORE', 'id')
      .addSelect('t2.STORE_NAME', 'name')
      .innerJoin('store', 't2', 't1.STORE = t2.STORE_ID')
      .addSelect(
        `json_arrayagg(t1.CATEGORY_ID)`,
        'cates',
      )
      .where(`t1.STORE in (${id})`);
    const data = await sql.getRawOne();

    if(!data.cates) {
      throw new HttpException({ message: `Không tồn tại cửa hàng này` }, HttpStatus.BAD_REQUEST)
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

  async selectCateRecords(cates: string[], store: string): Promise<any> {
    let ip = "http://20.247.98.235/coreservice"
    let sql = readConnection
      .getRepository(MenuEntity)
      .createQueryBuilder('t1')
      .select('t2.CATEGORY_CODE', 'id')
      .addSelect('t2.CATEGORY_NAME', 'name')
      .addSelect('t2.ACTIVE', 'availableStatus')
      .addSelect('t2.SEQUENCE', 'sequence')
      .leftJoin('thirdparty_category', 't2', 't1.CATEGORY_ID = t2.id')
      .leftJoin('sku', 't4', 't1.SKU_ID = t4.SKU_ID')
      .leftJoin('ps_price', 't5', '(t4.SKU_CODE = t5.sku and t1.STORE = t5.store)')
      .leftJoin('pop_sku_image', 't6', 't1.SKU_ID = t6.skuId')
      .addSelect(
        `json_arrayagg(
          json_object(
            "id", t4.SKU_CODE,
            "name", t4.ITEM_DESC_VNM,
            "availableStatus", t1.STATUS,
            "sequence", t1.SEQUENCE,
            "description", t1.description,
            "promoPrice", t5.promoPrice,
            "normalPrice", t5.normalPrice,
            "filePath", t6.filePath
          )
        )`,
        'items',
      )
      .where('t1.CATEGORY_ID in (:...cates) and t1.STORE = :store', { cates, store });
      // console.log(sql.groupBy('t1.CATEGORY_ID').getQuery())
    const data = await sql.groupBy('t1.CATEGORY_ID').getRawMany();
    return data.map((i) => {
      return {
        id: i.id,
        sequence: i.sequence,
        name: i.name,
        availableStatus: i.availableStatus === 'Y' ? "AVAILABLE" : "UNAVAILABLE",
        items: i.items.map((k) => {
          return {
            id: k.id,
            sequence: k.sequence,
            sort_type: 1,
            name: k.name,
            availableStatus: k.availableStatus === 0 ? "AVAILABLE" : "UNAVAILABLE",
            description: k.description,
            price: parseInt(k.promoPrice) ?? parseInt(k.normalPrice) ?? 300000,
            photos: [`${ip}/${k.filePath}`]
          }
        })
      }
    });
  }
}
