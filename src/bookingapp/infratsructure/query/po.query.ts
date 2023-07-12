import { FindPOByCodesResult } from 'src/bookingapp/application/query/find.po.bycodes.result';

export interface POQuery {
  // findAllCodes: () => Promise<any>;
  findByCodes: (codes: string[]) => Promise<FindPOByCodesResult>;
}
