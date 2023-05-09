import { readConnection } from '@libs/database.module';
import { FindPartnerByApikeyResult } from 'src/partner/application/query/find.partner.byapikey.result';
import { FindPartnerByIdResult } from 'src/partner/application/query/find.partner.byid.result';
import { FindPartnerQuery } from 'src/partner/application/query/find.partner.query';
import { FindPartnerResult } from 'src/partner/application/query/find.partner.result';
import { PartnerEntity } from '../entity/partner';
import { PartnerQuery } from './partner.query';

export class PartnerQueryImplement implements PartnerQuery {
  async find({ search, offset, limit }: FindPartnerQuery): Promise<FindPartnerResult> {
    let qb = readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .leftJoinAndSelect('t1.apikeys', 't2')
      .leftJoinAndSelect('t1.ipWhitelists', 't3');
    if (offset && limit) {
      qb = qb.skip(offset).take(limit);
    }
    if (search) {
      qb = qb.where(`t1.name LIKE :search`, { search: `%${search}%` });
    }
    return qb.getManyAndCount().then(([entities, total]) => {
      return {
        items: entities.map((entity) => {
          return {
            id: entity.id,
            name: entity.name,
            isDisabled: entity.common.isDisabled,
            createdAt: entity.common.createdAt,
            updatedAt: entity.common.updatedAt,
            apikeys: entity.apikeys,
            ipWhitelists: entity.ipWhitelists,
          };
        }),
        total,
      };
    });
  }

  async findById(id: number): Promise<FindPartnerByIdResult | null> {
    const entity = await readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .leftJoinAndSelect('t1.apikeys', 't2')
      .leftJoinAndSelect('t1.ipWhitelists', 't3')
      .where('t1.id = :id', { id })
      .getOne();
    return entity
      ? {
          id: entity.id,
          name: entity.name,
          isDisabled: entity.common.isDisabled,
          createdAt: entity.common.createdAt,
          updatedAt: entity.common.updatedAt,
          apikeys: entity.apikeys,
          ipWhitelists: entity.ipWhitelists,
        }
      : null;
  }

  async findByApikey(apikey: string): Promise<FindPartnerByApikeyResult | null> {
    const entity = await readConnection
      .getRepository(PartnerEntity)
      .createQueryBuilder('t1')
      .innerJoin('t1.apikeys', 't2')
      .leftJoinAndSelect('t1.ipWhitelists', 't3')
      .where('t2.key = :apikey', { apikey })
      .getOne();
    return entity
      ? {
          id: entity.id,
          name: entity.name,
          isDisabled: entity.common.isDisabled,
          ipWhitelists: entity.ipWhitelists.map((i) => i.ip),
        }
      : null;
  }
}
