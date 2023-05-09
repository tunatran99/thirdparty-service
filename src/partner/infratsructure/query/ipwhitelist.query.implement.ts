import { readConnection } from '@libs/database.module';
import { FindIpWhitelistByIdResult } from 'src/partner/application/query/find.ipwhitelist.byid.result';
import { IpWhitelistEntity } from '../entity/ipwhitelist';
import { IpWhitelistQuery } from './ipwhitelist.query';

export class IpWhitelistQueryImplement implements IpWhitelistQuery {
  async findById(id: number): Promise<FindIpWhitelistByIdResult | null> {
    const entity = await readConnection
      .getRepository(IpWhitelistEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :id', { id })
      .getOne();
    return entity
      ? {
          id: entity.id,
          ip: entity.ip,
          description: entity.description,
          isDisabled: entity.common.isDisabled,
          createdAt: entity.common.createdAt,
          updatedAt: entity.common.updatedAt,
        }
      : null;
  }
}
