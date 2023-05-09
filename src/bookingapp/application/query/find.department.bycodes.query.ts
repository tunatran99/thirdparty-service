import { IQuery } from '@nestjs/cqrs';

export class FindDepartmentByCodesQuery implements IQuery {
  constructor(readonly codes: string[]) {}
}
