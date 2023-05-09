import { IPartner } from 'src/partner/domain/partner';
import { PartnerEntity } from '../entity/partner';

export interface PartnerRepository {
  save: (data: IPartner | IPartner[]) => Promise<void>;
  findById: (id: number) => Promise<Record<string, PartnerEntity | IPartner> | null>;
}
