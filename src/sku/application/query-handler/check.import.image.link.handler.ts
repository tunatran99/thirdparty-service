import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { CheckImportImageLink } from '../query/check.import.image.link.query';
import { CheckImportImageLinkResult } from '../query/check.import.image.link.result';

@QueryHandler(CheckImportImageLink)
export class CheckImportImageLinkHandler implements IQueryHandler<CheckImportImageLink, CheckImportImageLinkResult> {
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;

  async execute({ sku, partner, type }: CheckImportImageLink): Promise<CheckImportImageLinkResult> {
    return await this.skuPricesQuery.checkImportImageLink(sku, partner, type);
  }
}
