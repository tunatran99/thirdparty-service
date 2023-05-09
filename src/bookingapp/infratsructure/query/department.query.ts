import { FindDepartmentByCodesResult } from 'src/bookingapp/application/query/find.department.bycodes.result';

export interface DepartmentQuery {
  findByCodes: (codes: string[]) => Promise<FindDepartmentByCodesResult>;
}
