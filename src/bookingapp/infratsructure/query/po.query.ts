import { FindPOByCodesResult } from 'src/bookingapp/application/query/find.po.bycodes.result';
import { FindPOByCodesScheduleResult } from 'src/bookingapp/application/query/find.po.bycodes.schedule.result';

export interface POQuery {
  findAllCodes: () => Promise<any>;
  findByCodes: (codes: string[]) => Promise<FindPOByCodesResult>;
  findByCodesSchedule: (codes: string[]) => Promise<FindPOByCodesScheduleResult>;
}
