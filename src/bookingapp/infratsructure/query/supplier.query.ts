import { FindSupplierByCodesResult } from 'src/bookingapp/application/query/find.supplier.bycodes.result';

export interface SupplierQuery {
  findByCodes: (codes: string[]) => Promise<FindSupplierByCodesResult>;
}
