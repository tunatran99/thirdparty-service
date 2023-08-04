import { IQuery } from '@nestjs/cqrs';

type purchaseProduct = Readonly<{
  unit: string;
  sku_code: string;
  purchase_number: number;
}>;

export class FindPOByCodesScheduleResult implements IQuery {
  constructor(
    readonly items: Readonly<{
      purchase_code: string;
      supplier_code: string;
      purchase_date: string;
      branch_code: string;
      contract_no: string;
      department_code: string;
      tax_code: string;
      purchase_product: purchaseProduct[];
    }>[],
  ) {}
}
