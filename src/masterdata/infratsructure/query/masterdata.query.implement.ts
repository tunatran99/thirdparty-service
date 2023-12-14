import { readConnection } from 'libs/database.module';
import moment from 'moment';
import { RoleEntity } from 'src/role/infratsructure/entity/role';
import { MasterdataQuery } from './masterdata.query';
import { StoreEntity } from 'src/sku/infratsructure/entity/store';
import { PartnerEntity } from 'src/partner/infratsructure/entity/partner';

export class MasterdataQueryImplement implements MasterdataQuery {
  async findRole(): Promise<any> {
    const sql = readConnection
      .getRepository(RoleEntity)
      .createQueryBuilder('t1')
      .select(
        `
      t1.id as id,
      t1.code as "code"
      `,
      )
      .where('t1.disabled = 0');

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }
  async findStore(): Promise<any> {
    const sql = readConnection
      .getRepository(StoreEntity)
      .createQueryBuilder('t1')
      .select(
        `
      t1.STORE_NUMBER as id,
      t1.STORE_ID as "storeId",
      t1.STORE_NAME as "storeName"
      `,
      )
      .where('t1.DELETED <> "Y"');

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }

  async findPartner(): Promise<any> {
    const sql = readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .select(
        `
      t1.id as partnerId,
      t1.name as "partnerName"
      `,
      );

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }
}
