import { readConnection } from '@libs/database.module';
import { FindItemByCodesResult } from 'src/shopeefood/application/query/find.item.bycodes.result';
import { ItemEntity } from '../entity/item';
import { ItemQuery } from './item.query';

export class ItemQueryImplement implements ItemQuery {
  async findByCodes(codes: string): Promise<FindItemByCodesResult> {
    let sql = readConnection.getRepository(ItemEntity).createQueryBuilder('t1');
    if (codes && codes.length > 0) {
      sql = sql.where('t1.ITEMSELLPRICE_CODE EQUAL', { codes });
    }
    const data = await sql.getMany();
    return {
      items: data.map((i) => {
        return {
          store: i.STORE,
          sku: i.SKU
        };
      }),
    };
  }
}
