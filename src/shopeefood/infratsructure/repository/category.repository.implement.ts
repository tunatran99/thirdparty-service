import { writeConnection } from 'libs/database.module';
// import { DataFactory } from 'src/populate/domain/data.factory';
import { CategoryEntity } from '../entity/category';
import { CategoryRepository } from './category.repository';
import { CategoryProperties, ICategory } from 'src/shopeefood/domain/category';

export class CategoryRepositoryImplement implements CategoryRepository {
  // @Inject() private readonly dataFactory: DataFactory;

  async save(data: ICategory | ICategory[]): Promise<CategoryEntity[]> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    return await writeConnection.manager.getRepository(CategoryEntity).save(entities);
  }

  private modelToEntity(model: ICategory): CategoryEntity {
    const properties = JSON.parse(JSON.stringify(model)) as CategoryProperties;
    return {
      ...properties,
    };
  }
}
