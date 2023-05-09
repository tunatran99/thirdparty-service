import { FindPartnerByApikeyResult } from 'src/partner/application/query/find.partner.byapikey.result';
import { FindPartnerByIdResult } from 'src/partner/application/query/find.partner.byid.result';
import { FindPartnerQuery } from 'src/partner/application/query/find.partner.query';
import { FindPartnerResult } from 'src/partner/application/query/find.partner.result';
export interface PartnerQuery {
  find: (query: FindPartnerQuery) => Promise<FindPartnerResult>;
  findById: (id: number) => Promise<FindPartnerByIdResult | null>;
  findByApikey: (apikey: string) => Promise<FindPartnerByApikeyResult | null>;
}
