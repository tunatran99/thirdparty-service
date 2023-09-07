import { readConnection, writeConnection } from 'libs/database.module';
import { DataProperties } from 'src/shopeefood/domain/data';
// import { DataFactory } from 'src/populate/domain/data.factory';
import { MenuEntity } from '../entity/menu';
import { DataRepository } from './data.repository';
import { CategoryEntity } from '../entity/category';
import { SkuEntity } from 'src/sku/infratsructure/entity/sku';
import { StoreEntity } from 'src/sku/infratsructure/entity/store';

export class DataRepositoryImplement implements DataRepository {
  // @Inject() private readonly dataFactory: DataFactory;

  async save(data: MenuEntity | MenuEntity[]): Promise<MenuEntity[]> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    return await writeConnection.manager.getRepository(MenuEntity).save(entities);
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

  private modelToEntity(model: MenuEntity): MenuEntity {
    const properties = JSON.parse(JSON.stringify(model)) as DataProperties;
    return {
      ...properties,
    };
  }
}
