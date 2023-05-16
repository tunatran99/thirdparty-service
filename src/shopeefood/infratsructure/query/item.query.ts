import { FindItemByCodesResult } from 'src/shopeefood/application/query/find.item.bycodes.result';

export interface ItemQuery {
  findByCodes: (codes: string) => Promise<FindItemByCodesResult>;
}
