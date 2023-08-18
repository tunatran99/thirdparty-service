import { readConnection } from '@libs/database.module';
import { Brackets } from 'typeorm';
import { PriceEntity } from '../entity/price';
import { SkuEntity } from '../entity/sku';
import { SkuPricesQuery } from './sku.prices.query';
import { FindSkuPricesByPartnerResult } from 'src/sku/application/query/find.sku.prices.bypartner.result';
import { PartnerEntity } from 'src/partner/infratsructure/entity/partner';
import { StoreEntity } from '../entity/store';
import { LineEntity } from 'src/bookingapp/infratsructure/entity/line';
import { GroupEntity } from 'src/bookingapp/infratsructure/entity/group';
import { DepartmentEntity } from 'src/bookingapp/infratsructure/entity/department';
import { CategoryEntity } from 'src/bookingapp/infratsructure/entity/category';
import { DivisionEntity } from 'src/bookingapp/infratsructure/entity/division';

export class SkuPricesQueryImplement implements SkuPricesQuery {
  async findPricesByCodes(codes: string[], partnerId: number): Promise<PriceEntity[]> {
    let sqlByPartner = readConnection
      .getRepository(PriceEntity)
      .createQueryBuilder('t2')
      .leftJoin('ps_partner_price', 't3', 't2.sku = t3.sku AND t2.store = t3.store AND t3.partnerId = :partnerId', {
        partnerId,
      });
    if (codes && codes.length > 0) {
      sqlByPartner = sqlByPartner.where('t2.sku IN (:...codes)', { codes }).andWhere('t3.active = true');
    }
    const byPartnerData = await sqlByPartner.getMany();

    let skusNotRelatedData = [];
    const skusNotRelated = codes.filter((i) => !byPartnerData.map((i) => i.sku).includes(i));
    if (skusNotRelated && skusNotRelated.length > 0) {
      skusNotRelatedData = await readConnection
        .getRepository(PriceEntity)
        .createQueryBuilder('t1')
        .where('t1.sku IN (:...skusNotRelated)', { skusNotRelated })
        .getMany();
    }
    return [...byPartnerData, ...skusNotRelatedData];
  }

  async findSkuPriceByPartner(
    offset = 0,
    limit = 10,
    partnerId: number,
    search?: string,
    storeId?: string,
    lineId?: string,
    groupId?: string,
    deptId?: string,
    cateId?: string
  ): Promise<FindSkuPricesByPartnerResult> {
    let sql = readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1')
      .offset(offset)
      .limit(limit)
      .select(
        `
      t1.SKU_ID as id,
      t1.SKU_CODE as sku,
      t1.ITEM_DESC_VNM as "nameEn",
      t1.POP2_DESC_VNM as "nameVn",
      t1.RETAIL_UOM as "uomEn",
      t1.POP3_DESC_VNM as "uomVn",
      t2.normalPrice as "normalPrice",
      t2.promoPrice as "promoPrice",
      t2.startTime as "startTime",
      t2.endTime as "endTime"
      `,
      )
      .leftJoin('ps_price', 't2', 't1.SKU_CODE = t2.sku')
      .innerJoin('ps_partner_price', 't3', 't2.sku = t3.sku AND t2.store = t3.store')
      .where('t3.partnerId = :partnerId', { partnerId });
    if (storeId) {
      sql = sql.andWhere('t2.store = :storeId', { storeId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.POP2_DESC_VNM) as "nameVn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime"
        `,
      );
      sql = sql.groupBy('t1.SKU_CODE');
    }
    if (lineId) {
      sql = sql.andWhere('t2.line = :lineId', { lineId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.POP2_DESC_VNM) as "nameVn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime"
        `,
      );
      sql = sql.groupBy('t1.SKU_CODE');
    }
    if (groupId) {
      sql = sql.andWhere('t2.group = :groupId', { groupId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.POP2_DESC_VNM) as "nameVn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime"
        `,
      );
      sql = sql.groupBy('t1.SKU_CODE');
    }
    if (deptId) {
      sql = sql.andWhere('t2.dept = :deptId', { deptId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.POP2_DESC_VNM) as "nameVn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime"
        `,
      );
      sql = sql.groupBy('t1.SKU_CODE');
    }
    if (cateId) {
      sql = sql.andWhere('t2.category = :cateId', { cateId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.POP2_DESC_VNM) as "nameVn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime"
        `,
      );
      sql = sql.groupBy('t1.SKU_CODE');
    }
    if (search) {
      sql = sql.andWhere(
        new Brackets((qb) => {
          qb.where('t1.SKU_CODE like :search', { search: `%${search}%` });
          qb.orWhere('t1.POP2_DESC_VNM like :search', {
            search: `%${search}%`,
          });
          qb.orWhere('t1.ITEM_DESC_VNM like :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    const items = await sql.getRawMany();
    return {
      items: items.map((i) => {
        const productName = i.nameVn || i.nameEn;
        delete i.nameVn;
        delete i.nameEn;
        return {
          ...i,
          productName,
        };
      }),
      total: await sql.getCount(),
    };
  }

  async findFilterInfo(): Promise<{ partners: PartnerEntity[]; stores: StoreEntity[]; 
    lines: LineEntity[]; cates: CategoryEntity[] }> {
    const partnerSql = readConnection.getRepository(PartnerEntity).createQueryBuilder('t1').getMany();
    const storeSql = readConnection.getRepository(StoreEntity).createQueryBuilder('t1').getMany();
    const lineSql = readConnection.getRepository(LineEntity).createQueryBuilder('t1').getMany();
    const cateSql = readConnection.getRepository(CategoryEntity).createQueryBuilder('t1').getMany();
    const [partners, stores, lines, cates] = await Promise.all([
      partnerSql, storeSql, lineSql, cateSql
    ]);
    return {
      partners,
      stores,
      lines,
      cates
    };
  }

  async findDivs(refId?: string[]): Promise<any> {
    let sql = readConnection.getRepository(DivisionEntity).createQueryBuilder('t1')
    .select(
      `
    t1.DIV_ID,
    t1.DIV_NAME
    `,
    )
    if (refId) {
      sql = sql.andWhere('t1.LINE_ID IN (:...refId)', { refId });
    }

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }

  async findGroups(refId?: string[]): Promise<any> {
    let sql = readConnection.getRepository(GroupEntity).createQueryBuilder('t1')
    .select(
      `
    t1.GROUP_ID,
    t1.GROUP_NAME
    `,
    )
    if (refId) {
      sql = sql.andWhere('t1.DIV_ID IN (:...refId)', { refId });
    }

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }
  async findDepts(refId?: string[]): Promise<any> {
    let sql = readConnection.getRepository(DepartmentEntity).createQueryBuilder('t1')
    .select(
      `
    t1.DEPT_ID,
    t1.DEPT_NAME
    `,
    )
    if (refId) {
      sql = sql.andWhere('t1.GROUP_ID IN (:...refId)', { refId });
    }

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }
  async findCates(refId?: string[]): Promise<any> {
    let sql = readConnection.getRepository(CategoryEntity).createQueryBuilder('t1')
    .select(
      `
    t1.CATEGORY_ID,
    t1.CATEGORY_NAME
    `,
    )
    if (refId) {
      sql = sql.andWhere('t1.DEPT_ID IN (:...refId)', { refId });
    }

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }

  async findSkuPricesDetail(partnerId: number, sku: string): Promise<any> {
    const partnerSql = readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :partnerId', { partnerId })
      .getOne();

    const skuSql = readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1')
      .select(
        `
      t1.SKU_ID as id,
      t1.SKU_CODE as sku,
      t1.CATEGORY_ID as "categoryId",
      t1.ITEM_DESC_VNM as "nameEn",
      t1.POP2_DESC_VNM as "nameVn",
      t1.RETAIL_UOM as "uomEn",
      t1.POP3_DESC_VNM as "uomVn"
      `,
      )
      .where('t1.SKU_CODE = :sku', { sku })
      .getRawOne();

    const pricesSql = readConnection
      .getRepository(PriceEntity)
      .createQueryBuilder('t1')
      .select(
        `
      t3.STORE_ID as "storeId",
      t3.STORE_NAME as "storeName",
      t1.normalPrice as "normalPrice",
      t1.promoPrice as "promoPrice",
      t1.startTime as "startTime",
      t1.endTime as "endTime",
      t2.active as active
      `,
      )
      .innerJoin('ps_partner_price', 't2', 't1.sku = t2.sku AND t1.store = t2.store AND t2.partnerId = :partnerId', {
        partnerId,
      })
      .innerJoin('store', 't3', 't1.store = t3.STORE_ID')
      .where('t1.sku = :sku', { sku })
      .getRawMany();

    const [partner, skuEntity, prices] = await Promise.all([partnerSql, skuSql, pricesSql]);

    skuEntity.productName = skuEntity.nameVn || skuEntity.nameEn;
    delete skuEntity.nameVn;
    delete skuEntity.nameEn;
    skuEntity.partnerName = partner.name;
    skuEntity.prices = prices;
    return skuEntity;
  }
}
