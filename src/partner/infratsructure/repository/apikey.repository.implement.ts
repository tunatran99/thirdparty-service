import { readConnection, writeConnection } from '@libs/database.module';
import { Inject } from '@nestjs/common';
import { IApikey, ApikeyProperties } from 'src/partner/domain/apikey';
import { ApikeyFactory } from 'src/partner/domain/apikey.factory';
import { ApikeyEntity } from '../entity/apikey';
import { ApikeyRepository } from './apikey.repository';

export class ApikeyRepositoryImplement implements ApikeyRepository {
  @Inject() private readonly apikeyFactory: ApikeyFactory;

  async save(data: IApikey | IApikey[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(ApikeyEntity).save(entities);
  }

  async findById(id: number): Promise<{ entity: ApikeyEntity; model: IApikey }> | null {
    const entity = await readConnection
      .getRepository(ApikeyEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :id', { id })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  async delete(id: number): Promise<void> {
    await writeConnection.manager.getRepository(ApikeyEntity).delete({ id });
  }

  private modelToEntity(model: IApikey): ApikeyEntity {
    const properties = JSON.parse(JSON.stringify(model)) as ApikeyProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: ApikeyEntity): IApikey {
    return this.apikeyFactory.reconstitute({
      ...entity,
    });
  }
}
