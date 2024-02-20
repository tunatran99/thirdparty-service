import { readConnection } from '@libs/database.module';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { PriceEntity } from '../entity/price';
import { SkuEntity } from '../entity/sku';
import { SkuPricesQuery } from './sku.prices.query';
import { FindSkuPricesByPartnerResult } from 'src/sku/application/query/find.sku.prices.bypartner.result';
import { PartnerEntity } from 'src/partner/infratsructure/entity/partner';
import { StoreEntity } from '../entity/store';
import { LineEntity } from 'src/bookingapp/infratsructure/entity/line';
import { GroupEntity } from 'src/bookingapp/infratsructure/entity/group';
import { DepartmentEntity } from 'src/bookingapp/infratsructure/entity/department';
import { CategoryEntity as ThirdpartyCategoryEntity } from 'src/shopeefood/infratsructure/entity/category';
import { CategoryEntity } from 'src/bookingapp/infratsructure/entity/category';
import { DivisionEntity } from 'src/bookingapp/infratsructure/entity/division';
import { MBPriceEntity } from '../entity/mb_price';
import { CheckImportImageLinkResult } from 'src/sku/application/query/check.import.image.link.result';
import { FindSkuImagesByPartnerResult } from 'src/sku/application/query/find.sku.images.bypartner.result';
import { SkuImageLinkEntity } from '../entity/sku_image_link';

export class SkuPricesQueryImplement implements SkuPricesQuery {
  async findPricesByCodes(codes: string[], partnerId: number): Promise<MBPriceEntity[]> {
    let sqlByPartner = readConnection
      .getRepository(MBPriceEntity)
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
        .getRepository(MBPriceEntity)
        .createQueryBuilder('t1')
        .where('t1.sku IN (:...skusNotRelated)', { skusNotRelated })
        .getMany();
    }
    return [...byPartnerData, ...skusNotRelatedData];
  }

  async findIdByCode(code: string): Promise<number> {
    const item = await readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1').select('t1.SKU_ID', 'skuId')
      .where('t1.SKU_CODE = :code', { code })
      .getRawOne();

    return item.skuId
  }

  async findIdByName(name: string): Promise<number> {
    const item = await readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1').select('t1.id', 'partnerId')
      .where('LOWER(t1.name) = :name', { name })
      .getRawOne();

    return item.partnerId;
  }

  async findSkuPriceByPartner(
    offset: number,
    limit: number,
    partnerId: number,
    search?: string,
    storeId?: string[],
    lineId?: string[],
    groupId?: string[],
    deptId?: string[],
    cateId?: string[],
    hasPromo?: string,
    status?: number,
    isExporting?: boolean,
    fromDate?: string,
    toDate?: string
  ): Promise<FindSkuPricesByPartnerResult> {
    let sql: SelectQueryBuilder<SkuEntity>;
    let partner = await readConnection.getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :partnerId', { partnerId })
      .getOne();

    if (partner.name === 'DB') {
      sql = readConnection
        .getRepository(SkuEntity)
        .createQueryBuilder('t1')
        .offset(offset)
        .limit(limit)
        .select(
          `
      t1.SKU_ID as id,
      t1.SKU_CODE as sku,
      t1.ITEM_DESC_VNM as "nameEn",
      t1.RETAIL_UOM as "uomEn",
      t1.POP3_DESC_VNM as "uomVn",
      t2.normalPrice as "normalPrice",
      t2.promoPrice as "promoPrice",
      t2.startTime as "startTime",
      t2.endTime as "endTime",
      t2.store as "store"
      `,
        )
        .leftJoin('ps_price', 't2', 't1.SKU_CODE = t2.sku')
    }
    else if (partner.name.toLocaleLowerCase() === "shopeefood") {
      sql = readConnection
        .getRepository(SkuEntity)
        .createQueryBuilder('t1')
        .offset(offset)
        .limit(limit)
        .select(
          `
      t1.SKU_ID as id,
      t1.SKU_CODE as sku,
      t1.ITEM_DESC_VNM as "nameEn",
      t1.RETAIL_UOM as "uomEn",
      t1.POP3_DESC_VNM as "uomVn",
      t2.normalPrice as "normalPrice",
      t2.promoPrice as "promoPrice",
      t2.startTime as "startTime",
      t2.endTime as "endTime",
      t2.store as "store",
      t2.futurePromoPrice as "futurePromoPrice",
      t2.futureStartTime as "futureStartTime",
      t2.futureEndTime as "futureEndTime",
      t3.SPF_DISH_ID as "SPF_DISH_ID",
      t4.CATEGORY_NAME as "CATEGORY_NAME"
      `,
        )
        .leftJoin('ps_price', 't2', 't1.SKU_CODE = t2.sku')
        .innerJoin('spf_menu', 't3', 't1.SKU_ID = t3.SKU_ID AND t2.store = t3.STORE')
        .innerJoin('thirdparty_category', 't4', 't3.CATEGORY_ID = t4.id')
    }
    else {
      sql = readConnection
        .getRepository(SkuEntity)
        .createQueryBuilder('t1')
        .offset(offset)
        .limit(limit)
        .select(
          `
      t1.SKU_ID as id,
      t1.SKU_CODE as sku,
      t1.ITEM_DESC_VNM as "nameEn",
      t1.RETAIL_UOM as "uomEn",
      t1.POP3_DESC_VNM as "uomVn",
      t2.normalPrice as "normalPrice",
      t2.promoPrice as "promoPrice",
      t2.startTime as "startTime",
      t2.endTime as "endTime",
      t2.store as "store",
      t2.futurePromoPrice as "futurePromoPrice",
      t2.futureStartTime as "futureStartTime",
      t2.futureEndTime as "futureEndTime"
      `,
        )
        .leftJoin('ps_price', 't2', 't1.SKU_CODE = t2.sku')
        .leftJoin('ps_partner_price', 't3', 't2.sku = t3.sku AND t2.store = t3.store')
        .where('t3.partnerId = :partnerId', { partnerId });
    }
    if (storeId) {
      sql = sql.andWhere('t2.store in (:...storeId)', { storeId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime",
      ANY_VALUE(t2.store) as "store",
      ANY_VALUE(t2.futurePromoPrice) as "futurePromoPrice",
      ANY_VALUE(t2.futureStartTime) as "futureStartTime",
      ANY_VALUE(t2.futureEndTime) as "futureEndTime"
        `,
      );
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        sql = sql.addSelect('ANY_VALUE(t3.SPF_DISH_ID) as "SPF_DISH_ID"')
          .addSelect('ANY_VALUE(t4.CATEGORY_NAME) as "CATEGORY_NAME"')
      }
      !isExporting && (sql = sql.groupBy('t1.SKU_CODE'));
    }
    if (lineId) {
      sql = sql.andWhere('t2.line in (:...lineId)', { lineId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime",
      ANY_VALUE(t2.store) as "store",
      ANY_VALUE(t2.futurePromoPrice) as "futurePromoPrice",
      ANY_VALUE(t2.futureStartTime) as "futureStartTime",
      ANY_VALUE(t2.futureEndTime) as "futureEndTime"
        `,
      );
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        sql = sql.addSelect('ANY_VALUE(t3.SPF_DISH_ID) as "SPF_DISH_ID"')
          .addSelect('ANY_VALUE(t4.CATEGORY_NAME) as "CATEGORY_NAME"')
      }
      !isExporting && (sql = sql.groupBy('t1.SKU_CODE'));
    }
    if (groupId) {
      sql = sql.andWhere('t2.group in (:...groupId)', { groupId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime",
      ANY_VALUE(t2.store) as "store",
      ANY_VALUE(t2.futurePromoPrice) as "futurePromoPrice",
      ANY_VALUE(t2.futureStartTime) as "futureStartTime",
      ANY_VALUE(t2.futureEndTime) as "futureEndTime"
        `,
      );
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        sql = sql.addSelect('ANY_VALUE(t3.SPF_DISH_ID) as "SPF_DISH_ID"')
          .addSelect('ANY_VALUE(t4.CATEGORY_NAME) as "CATEGORY_NAME"')
      }
      !isExporting && (sql = sql.groupBy('t1.SKU_CODE'));
    }
    if (deptId) {
      sql = sql.andWhere('t2.dept in (:...deptId)', { deptId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime",
      ANY_VALUE(t2.store) as "store",
      ANY_VALUE(t2.futurePromoPrice) as "futurePromoPrice",
      ANY_VALUE(t2.futureStartTime) as "futureStartTime",
      ANY_VALUE(t2.futureEndTime) as "futureEndTime"
        `,
      );
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        sql = sql.addSelect('ANY_VALUE(t3.SPF_DISH_ID) as "SPF_DISH_ID"')
          .addSelect('ANY_VALUE(t4.CATEGORY_NAME) as "CATEGORY_NAME"')
      }
      !isExporting && (sql = sql.groupBy('t1.SKU_CODE'));
    }
    if (cateId) {
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        let listCateId = [];
        for(const code of cateId) {
          const id = await this.findCateByCode(code);
          listCateId.push(id);
        }
        // let id = await this.findCateByCode(cateId);
        sql = sql.andWhere('t3.CATEGORY_ID in (:...listCateId)', { listCateId });
      }
      else
        sql = sql.andWhere('t2.category in (:...cateId)', { cateId });
    } else {
      sql = sql.select(
        `
      ANY_VALUE(t1.SKU_ID) as id,
      ANY_VALUE(t1.SKU_CODE) as sku,
      ANY_VALUE(t1.ITEM_DESC_VNM) as "nameEn",
      ANY_VALUE(t1.RETAIL_UOM) as "uomEn",
      ANY_VALUE(t1.POP3_DESC_VNM) as "uomVn",
      ANY_VALUE(t2.normalPrice) as "normalPrice",
      ANY_VALUE(t2.promoPrice) as "promoPrice",
      ANY_VALUE(t2.startTime) as "startTime",
      ANY_VALUE(t2.endTime) as "endTime",
      ANY_VALUE(t2.store) as "store",
      ANY_VALUE(t2.futurePromoPrice) as "futurePromoPrice",
      ANY_VALUE(t2.futureStartTime) as "futureStartTime",
      ANY_VALUE(t2.futureEndTime) as "futureEndTime"
        `,
      );
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        sql = sql.addSelect('ANY_VALUE(t3.SPF_DISH_ID) as "SPF_DISH_ID"')
          .addSelect('ANY_VALUE(t4.CATEGORY_NAME) as "CATEGORY_NAME"')
      }
      !isExporting && (sql = sql.groupBy('t1.SKU_CODE'));
    }
    if (isExporting) {
      sql = sql.addSelect(
        `
      ANY_VALUE(t2.futurePromoPrice) as "futurePromoPrice",
      ANY_VALUE(t2.futureStartTime) as "futureStartTime",
      ANY_VALUE(t2.futureEndTime) as "futureEndTime"
      `
      )
      if (partner.name.toLocaleLowerCase() === "shopeefood") {
        sql = sql.addSelect('ANY_VALUE(t3.SPF_DISH_ID) as "SPF_DISH_ID"')
          .addSelect('ANY_VALUE(t4.CATEGORY_NAME) as "CATEGORY_NAME"')
      }
    }
    if (hasPromo) {
      if (hasPromo === 'Y') {
        sql = sql.andWhere('t2.promoPrice is not null')
      }
      else {
        sql = sql.andWhere('t2.promoPrice is null')
      }
    }
    if (partner.name.toLocaleLowerCase() === "shopeefood" && status) {
      sql = sql.andWhere('t3.STATUS = :status', { status });
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
    if (fromDate && toDate) {
      sql = sql.andWhere(`date_format(t2.futureStartTime,'%Y-%m-%d') between :fromDate and :toDate`, { fromDate, toDate })
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

  async findSkuImageByPartner(
    offset: number,
    limit: number,
    partnerId: number,
    search?: string
  ): Promise<any> {
    let sql = readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1')
      .offset(offset)
      .limit(limit)
      .select(
        `
        t1.SKU_ID as id,
        t1.SKU_CODE as sku,
        t2.a3p_url_1 as a3p_url_1,
        t2.a3p_url_2 as a3p_url_2,
        t2.a3p_url_3 as a3p_url_3,
        t2.a3p_url_4 as a3p_url_4,
        t2.a3p_url_5 as a3p_url_5
        `,
      )
      .leftJoin('sku_image_link', 't2', 't1.SKU_ID = t2.skuId')
      .where('t2.partnerId = :partnerId', { partnerId });
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
      items,
      total: await sql.getCount(),
    };
  }

  async findPartners(partnerId?: string[]): Promise<PartnerEntity[]> {
    let partnerSql = readConnection.getRepository(PartnerEntity).createQueryBuilder('t1');
    if (partnerId) {
      let newPartnerId = partnerId.map(id => {
        return parseInt(id, 10);
      })
      partnerSql = partnerSql.where('t1.id in (:...newPartnerId)', { newPartnerId })
    }
    const partners = await partnerSql.getMany()

    return partners;
  }

  async findLines(partnerId?: number): Promise<any> {
    let sql = readConnection.getRepository(LineEntity).createQueryBuilder('t1')
    if (partnerId) {
      let partner = await readConnection.getRepository(PartnerEntity)
        .createQueryBuilder('t1')
        .where('t1.id = :partnerId', { partnerId })
        .getOne();

      if (partner.name.toLowerCase() === 'db') {
        sql = sql.select(`
        t1.LINE_ID,
        t1.LINE_NAME
        `,
        )
        const items = await sql.getRawMany();

        return items;
      }
    }

    return [];
  }

  async findStores(refId?: number, storeId?: string[]): Promise<any> {
    let sql = readConnection.getRepository(StoreEntity).createQueryBuilder('t1')
    if (refId) {
      let partner = await readConnection.getRepository(PartnerEntity)
        .createQueryBuilder('t1')
        .where('t1.id = :refId', { refId })
        .getOne();

      if (partner.name.toLowerCase() === 'shopeefood') {
        sql = sql.innerJoin('spf_menu', 't2', 't1.STORE_ID = t2.store')
      }
    }
    if (storeId) {
      sql = sql.where('t1.STORE_ID in (:...storeId)', { storeId })
    }

    const [items] = await Promise.all([sql.orderBy('t1.STORE_NUMBER', 'ASC').getMany()]);
    return items;
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
      sql = sql.where('t1.LINE_ID IN (:...refId)', { refId });
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
      sql = sql.where('t1.DIV_ID IN (:...refId)', { refId });
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
      sql = sql.where('t1.GROUP_ID IN (:...refId)', { refId });
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
      sql = sql.where('t1.DEPT_ID IN (:...refId)', { refId });
    }

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }
  async findThirdPartyCates(refId?: string[]): Promise<any> {
    let sql = readConnection.getRepository(ThirdpartyCategoryEntity)
      .createQueryBuilder('t1')
      .innerJoin('spf_menu', 't2', 't1.id = t2.CATEGORY_ID')
      .select(
        `
    t1.CATEGORY_CODE,
    t1.CATEGORY_NAME
    `,
      )
      .where('t1.id > 130');
    if (refId) {
      sql = sql.andWhere('t2.STORE in (:...refId)', { refId });
    }

    const [items] = await Promise.all([sql.getRawMany()]);
    return items;
  }
  async findCateByCode(code: string): Promise<any> {
    let item = await readConnection.getRepository(ThirdpartyCategoryEntity)
      .createQueryBuilder('t1')
      .select(`t1.id`, 'id')
      .where('t1.CATEGORY_CODE = :code', { code })
      .getRawOne();

    return item.id;
  }

  async checkImportImageLink(sku: string, partner: string, type?: string): Promise<CheckImportImageLinkResult> {
    let sql = readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1')
      .select(
        `
    t1.SKU_ID as "skuId",
    t1.SKU_CODE as "skuCode",
    t2.id as id,
    t2.a3p_url_1 as a3p_url_1,
    t2.a3p_url_2 as a3p_url_2,
    t2.a3p_url_3 as a3p_url_3,
    t2.a3p_url_4 as a3p_url_4,
    t2.a3p_url_5 as a3p_url_5,
    t3.name as partner
    `,
      )
      .leftJoin('sku_image_link', 't2', 't1.SKU_ID = t2.skuId')
      .leftJoin('ps_partner', 't3', 't2.partnerId = t3.id')
      .where('t1.SKU_CODE = :sku', { sku });

    const data = await sql.getRawMany();
    const create = [];
    const update = [];
    const error = [];
    let count = 0;
    // let found = false;
    if (data) {
      for (const item of data) {
        // if (item.skuCode === sku) {
        // found = true;
        item.id = Number.parseInt(item.id);
        item.skuId = Number.parseInt(item.skuId);
        if (item.partner) {
          if (item.partner.toLowerCase() === partner.toLowerCase()) {
            update.push({
              id: item.id,
              skuId: item.skuId,
              skuCode: item.skuCode,
              a3p_url_1: item.a3p_url_1,
              a3p_url_2: item.a3p_url_2,
              a3p_url_3: item.a3p_url_3,
              a3p_url_4: item.a3p_url_4,
              a3p_url_5: item.a3p_url_5,
              partner
            });
          }
          else {
            count++;
          }
        }
        else {
          create.push({
            skuId: item.skuId,
            skuCode: item.skuCode,
            partner
          });
        }
        // }
      }
      if (count === data.length) {
        create.push({
          skuId: Number.parseInt(data[0].skuId),
          skuCode: sku,
          partner
        });
      }
    }
    else {
      error.push({
        skuCode: sku,
      });
    }

    return {
      create,
      update,
      error,
    };
  }

  async findSkuPricesDetail(partnerId: number, sku: string): Promise<any> {
    let pricesSql: Promise<any[]>;

    const partner = await readConnection
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

    if (partner.name === 'DB') {
      pricesSql = readConnection
        .getRepository(PriceEntity)
        .createQueryBuilder('t1')
        .select(
          `
      t2.STORE_ID as "storeId",
      t2.STORE_NAME as "storeName",
      t1.normalPrice as "normalPrice",
      t1.promoPrice as "promoPrice",
      t1.startTime as "startTime",
      t1.endTime as "endTime",
      t1.STATUS as active
      `,
        )
        .innerJoin('store', 't2', 't1.store = t2.STORE_ID')
        .where('t1.sku = :sku', { sku })
        .getRawMany();
    }
    else if (partner.name.toLocaleLowerCase() === "shopeefood") {
      pricesSql = readConnection
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
      t2.STATUS as active
      `,
        )
        .innerJoin('sku', 't4', 't1.sku = t4.SKU_CODE')
        .innerJoin('spf_menu', 't2', 't4.SKU_ID = t2.SKU_ID AND t1.store = t2.STORE')
        .innerJoin('store', 't3', 't1.store = t3.STORE_ID')
        .where('t1.sku = :sku', { sku })
        .getRawMany();
    }
    else {
      pricesSql = readConnection
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
    }

    const [skuEntity, prices] = await Promise.all([skuSql, pricesSql]);

    skuEntity.productName = skuEntity.nameVn || skuEntity.nameEn;
    delete skuEntity.nameVn;
    delete skuEntity.nameEn;
    skuEntity.partnerName = partner.name;
    skuEntity.prices = prices.map(price => {
      return {
        ...price,
        normalPrice: parseInt(price.normalPrice),
        promoPrice: parseInt(price.promoPrice),
        active: partner.name.toLocaleLowerCase() === "shopeefood" ?
          (price.active === 0 ? true : false) :
          partner.name.toLocaleLowerCase() === "db" ?
            (price.active === 0 ? false : true) : price.active
      }
    });
    return skuEntity;
  }

  async findActiveImage(partnerId: number, skuId: number) {
    const result = await readConnection
      .getRepository(SkuImageLinkEntity)
      .createQueryBuilder('t1')
      .select('t1.active', 'active')
      .where('t1.partnerId = :partnerId and t1.skuId = :skuId', { partnerId, skuId })
      .getRawOne();
    if(result) return result.active;
    return null;
  }
}
