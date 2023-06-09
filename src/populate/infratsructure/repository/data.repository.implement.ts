import { writeConnection } from 'libs/database.module';
import { DataProperties } from 'src/populate/domain/data';
// import { DataFactory } from 'src/populate/domain/data.factory';
import { MenuEntity } from '../entity/menu';
import { DataRepository } from './data.repository';

export class DataRepositoryImplement implements DataRepository {
  // @Inject() private readonly dataFactory: DataFactory;

  async save(data: MenuEntity | MenuEntity[]): Promise<MenuEntity[]> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    return await writeConnection.manager.getRepository(MenuEntity).save(entities);
  }

  private modelToEntity(model: MenuEntity): MenuEntity {
    const properties = JSON.parse(JSON.stringify(model)) as DataProperties;
    return {
      ...properties,
    };
  }
}
