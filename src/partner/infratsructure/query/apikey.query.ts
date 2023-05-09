import { FindApikeyByIdResult } from 'src/partner/application/query/find.apikey.byid.result';
export interface ApikeyQuery {
  findById: (id: number) => Promise<FindApikeyByIdResult | null>;
}
