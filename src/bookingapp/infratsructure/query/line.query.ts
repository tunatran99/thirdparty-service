import { FindLineByCodesResult } from 'src/bookingapp/application/query/find.line.bycodes.result';

export interface LineQuery {
  findByCodes: (codes: string[]) => Promise<FindLineByCodesResult>;
}
