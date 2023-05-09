import { writeConnection } from '@libs/database.module';
import { PartnerPriceEntity } from '../entity/partner.price';
import { PartnerPricesRepository } from './partner.prices.repository';

export class PartnerPricesRepositoryImplement implements PartnerPricesRepository {
  async save(data: PartnerPriceEntity | PartnerPriceEntity[]): Promise<void> {
    const entities = Array.isArray(data) ? data : [data];
    await writeConnection.manager.getRepository(PartnerPriceEntity).save(entities);
  }
}
