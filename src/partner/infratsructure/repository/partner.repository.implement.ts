import { readConnection, writeConnection } from '@libs/database.module';
import { Inject } from '@nestjs/common';
import { IPartner, PartnerProperties } from 'src/partner/domain/partner';
import { PartnerFactory } from 'src/partner/domain/partner.factory';
import { PartnerEntity } from '../entity/partner';
import { PartnerRepository } from './partner.repository';

export class PartnerRepositoryImplement implements PartnerRepository {
  @Inject() private readonly partnerFactory: PartnerFactory;

  async save(data: IPartner | IPartner[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(PartnerEntity).save(entities);
  }

  async findById(id: number): Promise<{ entity: PartnerEntity; model: IPartner }> | null {
    const entity = await readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :id', { id })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  private modelToEntity(model: IPartner): PartnerEntity {
    const properties = JSON.parse(JSON.stringify(model)) as PartnerProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: PartnerEntity): IPartner {
    return this.partnerFactory.reconstitute({
      ...entity,
    });
  }
}
