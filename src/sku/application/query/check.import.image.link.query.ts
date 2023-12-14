import { IQuery } from '@nestjs/cqrs';

export class CheckImportImageLink implements IQuery {
  constructor(readonly sku: string, readonly partner: string) {}
}
