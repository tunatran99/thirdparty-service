import { readConnection, writeConnection } from '@libs/database.module';
import { GroupPricechangeEntity } from '../entity/group_price_change';
import { ItemSellPriceEntity } from '../entity/item_sell_price';
import { PartnerPriceEntity } from '../entity/partner.price';
import { PriceEntity } from '../entity/price';
import { PricechangeEntity } from '../entity/price_change';
import { SkuEntity } from '../entity/sku';
import { UomEntity } from '../entity/uom';
import { PriceServiceRepository } from './price.service.repository';
import { StoreEntity } from '../entity/store';
import { MenuEntity } from 'src/shopeefood/infratsructure/entity/menu';
import { SkuCodeTempEntity } from '../entity/sku_code_temp';
import { MBPriceEntity } from '../entity/mb_price';
import { SkuImageLinkEntity } from '../entity/sku_image_link';

export class PriceServiceRepositoryImplement implements PriceServiceRepository {
  async findUom(): Promise<UomEntity[]> {
    return await readConnection.getRepository(UomEntity).createQueryBuilder('t1').getMany();
  }

  async findSkuInMenu(skus: string[]): Promise<SkuEntity[]> {
    // console.log(readConnection.getRepository(SkuEntity).createQueryBuilder('t1')
    // .select('t1.SKU_CODE')
    // .distinct(true)
    // .innerJoin('spf_menu', 't2', 't1.SKU_ID = t2.SKU_ID')
    // .where('t1.SKU_CODE in (:...skus)', { skus }).getQuery());
    return await readConnection.getRepository(SkuEntity).createQueryBuilder('t1')
      .select('t1.SKU_CODE')
      .distinct(true)
      .innerJoin('spf_menu', 't2', 't1.SKU_ID = t2.SKU_ID')
      .where('t1.SKU_CODE in (:...skus)', { skus })
      .getMany();
    // return null;
  }

  async findStore(): Promise<StoreEntity[]> {
    return await readConnection.getRepository(StoreEntity).createQueryBuilder('t1').getMany();
  }

  async findLatestSku(date: string): Promise<SkuEntity[]> {
    let sql = readConnection.getRepository(SkuEntity).createQueryBuilder('t1')
      .where('t1.MODIFIED_DATE = :date', { date });
    return await sql.getMany();
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

  async findCategoryBySku(sku: string): Promise<string> {
    let foundSku = await readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1')
      .where('t1.SKU_CODE = :sku', { sku })
      .getOne();

    return foundSku.CATEGORY_ID;
  }

  async findPcByStartdate(startdate: string): Promise<PricechangeEntity[]> {
    return await readConnection
      .getRepository(PricechangeEntity)
      .createQueryBuilder('t1')
      .where('t1.START_DATE = :startdate', { startdate })
      .getMany();
  }

  async findPcByEnddate(enddate: string): Promise<PricechangeEntity[]> {
    return await readConnection
      .getRepository(PricechangeEntity)
      .createQueryBuilder('t1')
      .where('t1.END_DATE = :enddate', { enddate })
      .getMany();
  }

  async findGpcByCategories(categories: string[]): Promise<GroupPricechangeEntity[]> {
    return await readConnection
      .getRepository(GroupPricechangeEntity)
      .createQueryBuilder('t1')
      .where('t1.CATEGORY IN (:...categories)', { categories })
      .getMany();
  }

  async findMemberPrices(): Promise<PriceEntity[]> {
    return await readConnection
      .getRepository(PriceEntity)
      .createQueryBuilder('t1')
      .select('t1.sku', 'sku')
      .where("t1.member = 'Y'")
      .getMany();
  }

  async findPrice(sku: string, store: string): Promise<PriceEntity> {
    return await readConnection
      .getRepository(PriceEntity)
      .createQueryBuilder('t1')
      .where('t1.sku = :sku', { sku })
      .andWhere('t1.store = :store', { store })
      .getOne();
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

  async saveMBPrices(data: MBPriceEntity | MBPriceEntity[]): Promise<void> {
    const entities = Array.isArray(data) ? data : [data];
    // Không có giá trị member thì gán N
    entities.forEach((i) => {
      if (!i.member) {
        i.member = 'N';
      }
    });
    await writeConnection.manager.getRepository(MBPriceEntity).save(entities);
  }

  async saveMenuPrices(data: SkuCodeTempEntity | SkuCodeTempEntity[]): Promise<void> {
    const entities = Array.isArray(data) ? data : [data];
    await writeConnection.manager.getRepository(SkuCodeTempEntity).save(entities)
  }

  async updateAppliedList(data: any[]): Promise<void> {
    const promises = [];
    if (data[0].partnerId.toLowerCase() === 'shopeefood') {
      for (const item of data) {
        const sku = await readConnection
          .getRepository(SkuEntity)
          .createQueryBuilder('t1')
          .where('t1.SKU_CODE = :code', { code: item.sku })
          .getOne();
        const pros = writeConnection.manager
          .getRepository(MenuEntity)
          .createQueryBuilder()
          .update()
          .set({ STATUS: item.active ? 0 : 1 })
          .where('SKU_ID = :SKU_ID', { SKU_ID: sku.SKU_ID })
          .andWhere('STORE = :store', { store: item.store })
          .execute();
        promises.push(pros);
      }
    }
    else {
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
    }
    await Promise.all(promises);
  }

  async activeImage(data: any): Promise<void> {
    await writeConnection.manager
      .getRepository(SkuImageLinkEntity)
      .createQueryBuilder()
      .update()
      .set({ active: data.active })
      .where('skuId = :skuId', { skuId: data.skuId })
      .andWhere('partnerId = :partnerId', { partnerId: data.partnerId })
      .execute();
  }
}
