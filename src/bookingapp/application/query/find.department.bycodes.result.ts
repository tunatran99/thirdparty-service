import { IQueryResult } from '@nestjs/cqrs';

export class FindDepartmentByCodesResult implements IQueryResult {
  constructor(
    readonly items: Readonly<{
      line_code: string;
      department_code: string;
      department_name: string;
      department_status: number;
    }>[],
  ) {}
}
