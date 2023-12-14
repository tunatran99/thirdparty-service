import { readConnection, writeConnection } from 'libs/database.module';
import { DataProperties, IData } from 'src/shopeefood/domain/data';
import { DataFactory } from 'src/shopeefood/domain/data.factory';
import { MenuEntity } from '../entity/menu';
import { DataRepository } from './data.repository';
import { CategoryEntity } from '../entity/category';
import { SkuEntity } from 'src/sku/infratsructure/entity/sku';
import { StoreEntity } from 'src/sku/infratsructure/entity/store';
import { Inject } from '@nestjs/common';

export class DataRepositoryImplement implements DataRepository {
  @Inject() private readonly dataFactory: DataFactory;

  async save(data: IData | IData[]): Promise<MenuEntity[]> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    return await writeConnection.manager.getRepository(MenuEntity).save(entities);
  }

  async findBySkuId(skuId: number, store: string): Promise<{ entity: MenuEntity; model: IData }> | null {
    const entity = await readConnection
    .getRepository(MenuEntity)
    .createQueryBuilder('t1')
    .where('t1.SKU_ID = :skuId', { skuId })
    .andWhere('t1.STORE = :store', { store })
    .getOne();

    return entity ? { entity: entity, model: this.entityToModel(entity) } : null
  }

  async findCategoryIdByCode(code: string): Promise<number> {
    const category = await readConnection
    .getRepository(CategoryEntity)
    .createQueryBuilder('t1')
    .where('t1.CATEGORY_CODE = :code', { code })
    .getOne();
    
    return category.id;
  }

  async findSkuIdByCode(code: string): Promise<number> {
    const sku = await readConnection
    .getRepository(SkuEntity)
    .createQueryBuilder('t1')
    .where('t1.SKU_CODE = :code', { code })
    .getOne();
    
    return sku.SKU_ID;
  }

  async findStoreIdByCode(code: string): Promise<number> {
    const store = await readConnection
    .getRepository(StoreEntity)
    .createQueryBuilder('t1')
    .where('t1.STORE_ID = :code', { code })
    .getOne();
    
    return store.STORE_NUMBER;
  }

  private modelToEntity(model: IData): MenuEntity {
    const properties = JSON.parse(JSON.stringify(model)) as DataProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: MenuEntity): IData {
    return this.dataFactory.reconstitute({
      ...entity,
    });
  }
}
