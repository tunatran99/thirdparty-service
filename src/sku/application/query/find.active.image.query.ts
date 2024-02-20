import { IQuery } from '@nestjs/cqrs';

export class FindActiveImageQuery implements IQuery {
  constructor(readonly partnerId: number, readonly skuId: number) {}
}
