import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { ISkuImageLink } from 'src/sku/domain/sku.image.link';
import { SkuImageLinkFactory } from 'src/sku/domain/sku.image.link.factory';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { SkuImageLinkRepositoryImplement } from 'src/sku/infratsructure/repository/sku.image.link.repository.implement';
import { ImportImageLink } from '../command/import.image.link.command';

@CommandHandler(ImportImageLink)
export class ImportImageLinkHandler implements ICommandHandler<ImportImageLink, void> {
  @Inject()
  private readonly skuImageLinkRepo: SkuImageLinkRepositoryImplement;
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;
  @Inject() private readonly skuImageLinkFactory: SkuImageLinkFactory;

  @Transactional()
  async execute({ body }: ImportImageLink): Promise<void> {
    const saveData = [] as ISkuImageLink[];
    for (const item of body) {
      const skuId = await this.skuPricesQuery.findIdByCode(item.skuCode);
      const partnerId = await this.skuPricesQuery.findIdByName(item.partner.toLowerCase());

      let media: ISkuImageLink;
      if (item.type === 'update') {
        const { model } = await this.skuImageLinkRepo.findByCode(item.skuCode, partnerId);
        if (item.fileType === 'jpg') {
          model.update({
            jpeg: item.url
          });
        }
        if (item.fileType === 'png') {
          model.update({
            png: item.url
          });
        }
        media = model;
      } else {
        if (item.fileType === 'jpg') {
          media = this.skuImageLinkFactory.create({
            skuId,
            skuCode: item.skuCode,
            jpeg: item.url,
            partnerId
          });
          media.create();
        }
        if (item.fileType === 'png') {
          media = this.skuImageLinkFactory.create({
            skuId,
            skuCode: item.skuCode,
            png: item.url,
            partnerId
          });
          media.create();
        }
      }
      saveData.push(media);
    }

    await this.skuImageLinkRepo.save(saveData);

    for (const item of saveData) {
      item.commit();
    }
  }
}
