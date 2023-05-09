import { IQueryResult } from '@nestjs/cqrs';

type branchList = Readonly<{
  tax_code: string;
  branch_code: string;
  branch_status: number;
  supplier_name: string;
  supplier_email: string;
  supplier_phone: string;
}>;

export class FindSupplierByCodesResult implements IQueryResult {
  constructor(
    readonly items: Readonly<{
      supplier_code: string;
      supplier_status: number;
      contract_no: string;
      branch_list: branchList[];
    }>[],
  ) {}
}
