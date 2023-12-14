import { IQueryResult } from '@nestjs/cqrs';

export class CheckImportImageLinkResult implements IQueryResult {
  readonly create: Readonly<{
    skuId: number;
    skuCode: string;
    partner: string;
  }>[];
  readonly update: Readonly<{
    id: number;
    skuId: number;
    skuCode: string;
    url: string;
    partner: string;
  }>[];
  readonly error: Readonly<{
    skuCode: string;
  }>[];
}
