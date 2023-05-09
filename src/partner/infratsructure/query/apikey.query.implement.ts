import { readConnection } from '@libs/database.module';
import { FindApikeyByIdResult } from 'src/partner/application/query/find.apikey.byid.result';
import { ApikeyEntity } from '../entity/apikey';
import { ApikeyQuery } from './apikey.query';

export class ApikeyQueryImplement implements ApikeyQuery {
  async findById(id: number): Promise<FindApikeyByIdResult | null> {
    const entity = await readConnection
      .getRepository(ApikeyEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :id', { id })
      .getOne();
    return entity
      ? {
          id: entity.id,
          key: entity.key,
          description: entity.description,
          isDisabled: entity.common.isDisabled,
          createdAt: entity.common.createdAt,
          updatedAt: entity.common.updatedAt,
        }
      : null;
  }
}
