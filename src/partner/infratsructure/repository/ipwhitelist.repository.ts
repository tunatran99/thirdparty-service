import { IIpWhitelist } from 'src/partner/domain/ipwhitelist';
import { IpWhitelistEntity } from '../entity/ipwhitelist';

export interface IpWhitelistRepository {
  save: (data: IIpWhitelist | IIpWhitelist[]) => Promise<void>;
  findById: (id: number) => Promise<Record<string, IpWhitelistEntity | IIpWhitelist> | null>;
  delete: (id: number) => Promise<void>;
}
