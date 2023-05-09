import { FindPOByCodesResult } from 'src/bookingapp/application/query/find.po.bycodes.result';

export interface POQuery {
  findByCodes: (codes: string[]) => Promise<FindPOByCodesResult>;
}
