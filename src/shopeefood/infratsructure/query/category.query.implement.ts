import { readConnection } from '@libs/database.module';
import { FindCategoryByCodesResult } from 'src/shopeefood/application/query/find.category.bycodes.result';
import { SkuEntity } from 'src/sku/infratsructure/entity/sku';
import { CategoryEntity } from '../entity/category';
import { CategoryQuery } from './category.query';

export class CategoryQueryImplement implements CategoryQuery {
  async selectSomeRecords(id: number): Promise<FindCategoryByCodesResult> {
    let sql = readConnection
      .getRepository(CategoryEntity)
      .createQueryBuilder('t1')
      .addSelect('t1.CATEGORY_NUMBER', 'id')
      .addSelect('t1.CATEGORY_NAME', 'name')
      .addSelect('t1.DELETED', 'availableStatus')
      .innerJoin('sku', 't2', 't1.CATEGORY_ID = t2.CATEGORY_ID')
      .addSelect(
        `json_arrayagg(
          json_object(
            "id", t2.SKU_ID,
            "name", t2.POP2_DESC_VNM,
            "availableStatus", t2.DELETED,
            "description", t2.SELLING_POINT2
          )
        )`,
        'items',
      )
      .where('t1.CATEGORY_NUMBER in (1,2,3,4,5)');
    const data = await sql.groupBy('t1.CATEGORY_NUMBER').getRawMany();
    return {
      categories: data.map((i) => {
        return {
          id: i.id,
          sequence: null,
          name: i.name,
          availableStatus: i.availableStatus,
          items: i.items?.map((k) => {
            return {
              ...k,
              sequence: null,
              price: 0,
              photos: []
            }
          })
        };
      }),
    };
  }
}
