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
      const { a3p_url_1, a3p_url_2, a3p_url_3, a3p_url_4, a3p_url_5 } = item;
      const skuId = await this.skuPricesQuery.findIdByCode(item.skuCode);
      const partnerId = await this.skuPricesQuery.findIdByName(item.partner.toLowerCase());

      let media: ISkuImageLink;
      if (item.type === 'update') {
        const { model } = await this.skuImageLinkRepo.findByCode(item.skuCode, partnerId);
        model.update({
          a3p_url_1, a3p_url_2, a3p_url_3, a3p_url_4, a3p_url_5
        });
        media = model;
      } else {
        media = this.skuImageLinkFactory.create({
          skuId,
          skuCode: item.skuCode,
          a3p_url_1, a3p_url_2, a3p_url_3, a3p_url_4, a3p_url_5,
          partnerId
        });
        media.create();
      }
      saveData.push(media);
    }

    await this.skuImageLinkRepo.save(saveData);

    for (const item of saveData) {
      item.commit();
    }
  }
}
