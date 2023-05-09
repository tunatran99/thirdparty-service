import { readConnection, writeConnection } from '@libs/database.module';
import { GroupPricechangeEntity } from '../entity/group_price_change';
import { ItemSellPriceEntity } from '../entity/item_sell_price';
import { PartnerPriceEntity } from '../entity/partner.price';
import { PriceEntity } from '../entity/price';
import { PricechangeEntity } from '../entity/price_change';
import { SkuEntity } from '../entity/sku';
import { UomEntity } from '../entity/uom';
import { PriceServiceRepository } from './price.service.repository';

export class PriceServiceRepositoryImplement implements PriceServiceRepository {
  async findUom(): Promise<UomEntity[]> {
    return await readConnection.getRepository(UomEntity).createQueryBuilder('t1').getMany();
  }

  async findAndCountSku(skus?: string[]): Promise<SkuEntity[]> {
    let sql = readConnection.getRepository(SkuEntity).createQueryBuilder('t1');
    if (skus && skus.length > 0) {
      sql = sql.where('t1.SKU_CODE IN (:...skus)', { skus });
    }
    return await sql.getMany();
  }

  async findIspBySkus(skus: string[]): Promise<ItemSellPriceEntity[]> {
    return await readConnection
      .getRepository(ItemSellPriceEntity)
      .createQueryBuilder('t1')
      .where('t1.SKU IN (:...skus)', { skus })
      .getMany();
  }

  async findPcBySkus(skus: string[]): Promise<PricechangeEntity[]> {
    return await readConnection
      .getRepository(PricechangeEntity)
      .createQueryBuilder('t1')
      .where('t1.SKU IN (:...skus)', { skus })
      .andWhere('t1.STATUS <> "D"')
      .getMany();
  }

  async findPcByStartdate(startdate: string): Promise<PricechangeEntity[]> {
    return await readConnection
      .getRepository(PricechangeEntity)
      .createQueryBuilder('t1')
      .where('t1.START_DATE = :startdate', { startdate })
      .getMany();
  }

  async findGpcByCategories(categories: string[]): Promise<GroupPricechangeEntity[]> {
    return await readConnection
      .getRepository(GroupPricechangeEntity)
      .createQueryBuilder('t1')
      .where('t1.CATEGORY IN (:...categories)', { categories })
      .getMany();
  }

  async savePrices(data: PriceEntity | PriceEntity[]): Promise<void> {
    const entities = Array.isArray(data) ? data : [data];
    // Không có giá trị member thì gán N
    entities.forEach((i) => {
      if (!i.member) {
        i.member = 'N';
      }
    });
    await writeConnection.manager.getRepository(PriceEntity).save(entities);
  }

  async updateAppliedList(data: any[]): Promise<void> {
    const promises = [];
    for (const item of data) {
      const pros = writeConnection.manager
        .getRepository(PartnerPriceEntity)
        .createQueryBuilder()
        .update()
        .set({ active: item.active })
        .where('partnerId = :partnerId', { partnerId: item.partnerId })
        .andWhere('sku = :sku', { sku: item.sku })
        .andWhere('store = :store', { store: item.store })
        .execute();
      promises.push(pros);
    }
    await Promise.all(promises);
  }
}
