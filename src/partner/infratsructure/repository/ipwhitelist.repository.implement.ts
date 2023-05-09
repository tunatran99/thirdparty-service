import { readConnection, writeConnection } from '@libs/database.module';
import { Inject } from '@nestjs/common';
import { IIpWhitelist, IpWhitelistProperties } from 'src/partner/domain/ipwhitelist';
import { IpWhitelistFactory } from 'src/partner/domain/ipwhitelist.factory';
import { IpWhitelistEntity } from '../entity/ipwhitelist';
import { IpWhitelistRepository } from './ipwhitelist.repository';

export class IpWhitelistRepositoryImplement implements IpWhitelistRepository {
  @Inject() private readonly ipwhitelistFactory: IpWhitelistFactory;

  async save(data: IIpWhitelist | IIpWhitelist[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(IpWhitelistEntity).save(entities);
  }

  async findById(id: number): Promise<{ entity: IpWhitelistEntity; model: IIpWhitelist }> | null {
    const entity = await readConnection
      .getRepository(IpWhitelistEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :id', { id })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  async delete(id: number): Promise<void> {
    await writeConnection.manager.getRepository(IpWhitelistEntity).delete({ id });
  }

  private modelToEntity(model: IIpWhitelist): IpWhitelistEntity {
    const properties = JSON.parse(JSON.stringify(model)) as IpWhitelistProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: IpWhitelistEntity): IIpWhitelist {
    return this.ipwhitelistFactory.reconstitute({
      ...entity,
    });
  }
}
