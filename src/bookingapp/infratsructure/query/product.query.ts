import { FindProductByCodesResult } from 'src/bookingapp/application/query/find.product.bycodes.result';

export interface ProductQuery {
  findByCodes: (codes: string[]) => Promise<FindProductByCodesResult>;
}
