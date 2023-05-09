import { FindIpWhitelistByIdResult } from 'src/partner/application/query/find.ipwhitelist.byid.result';
export interface IpWhitelistQuery {
  findById: (id: number) => Promise<FindIpWhitelistByIdResult | null>;
}
