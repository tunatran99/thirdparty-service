import { IQuery } from '@nestjs/cqrs';

export class FindSupplierByCodesQuery implements IQuery {
  constructor(readonly codes: string[]) {}
}
