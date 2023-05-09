import { PartnerPriceEntity } from '../entity/partner.price';

export interface PartnerPricesRepository {
  save: (data: PartnerPriceEntity | PartnerPriceEntity[]) => Promise<void>;
}
