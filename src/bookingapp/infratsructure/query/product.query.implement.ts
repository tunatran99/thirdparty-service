import { readConnection } from '@libs/database.module';
import { FindProductByCodesResult } from 'src/bookingapp/application/query/find.product.bycodes.result';
import { ProductEntity } from '../entity/product';
import { ProductQuery } from './product.query';

export class ProductQueryImplement implements ProductQuery {
  async findByCodes(codes: string[]): Promise<FindProductByCodesResult> {
    let sql = readConnection.getRepository(ProductEntity).createQueryBuilder('t1');
    if (codes && codes.length > 0) {
      sql = sql.where('t1.SKU_CODE IN (:...codes)', { codes });
    }
    const data = await sql.maxExecutionTime(40000).getMany();
    return {
      items: data.map((i) => {
        return {
          sku_code: i.SKU_CODE,
          product_name: i.POP2_DESC_VNM || i.ITEM_DESC_VNM,
          product_status: i.DELETED === 'Y' ? 2 : i.ACTIVED === 'Y' ? 1 : 0,
        };
      }),
    };
  }
}
