import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { ISkuImageLinkOld } from 'src/sku/domain/sku.image.link_old';
import { SkuPricesQueryImplement } from 'src/sku/infratsructure/query/sku.prices.query.implement';
import { SkuImageLinkRepositoryImplement } from 'src/sku/infratsructure/repository/sku.image.link.repository.implement';
import { SkuImageLinkOldFactory } from 'src/sku/domain/sku.image.link_old.factory';
import { ImportImageLinkOld } from '../command/import.image.link.old.command';

@CommandHandler(ImportImageLinkOld)
export class ImportImageLinkOldHandler implements ICommandHandler<ImportImageLinkOld, void> {
  @Inject()
  private readonly skuImageLinkRepo: SkuImageLinkRepositoryImplement;
  @Inject()
  private readonly skuPricesQuery: SkuPricesQueryImplement;
  @Inject() private readonly skuImageLinkFactory: SkuImageLinkOldFactory;

  @Transactional()
  async execute({ body }: ImportImageLinkOld): Promise<void> {
    const saveData = [] as ISkuImageLinkOld[];
    for (const item of body) {
      const skuId = await this.skuPricesQuery.findIdByCode(item.skuCode);
      const partnerId = await this.skuPricesQuery.findIdByName(item.partner.toLowerCase());

      let media: ISkuImageLinkOld;
      if (item.type === 'update') {
        const { model } = await this.skuImageLinkRepo.findByCodeOld(item.skuCode, partnerId);
        model.update({
          url: item.url
        });
        // if (item.fileType === 'jpg') {
        //   model.update({
        //     jpeg: item.url
        //   });
        // }
        // if (item.fileType === 'png') {
        //   model.update({
        //     png: item.url
        //   });
        // }
        media = model;
      } else {
        // if (item.fileType === 'jpg') {
        //   media = this.skuImageLinkFactory.create({
        //     skuId,
        //     skuCode: item.skuCode,
        //     jpeg: item.url,
        //     partnerId
        //   });
        //   media.create();
        // }
        // if (item.fileType === 'png') {
        //   media = this.skuImageLinkFactory.create({
        //     skuId,
        //     skuCode: item.skuCode,
        //     png: item.url,
        //     partnerId
        //   });
        //   media.create();
        // }
        media = this.skuImageLinkFactory.create({
          skuId,
          skuCode: item.skuCode,
          url: item.url,
          partnerId
        });
        media.create();
      }
      saveData.push(media);
    }

    await this.skuImageLinkRepo.saveOld(saveData);

    for (const item of saveData) {
      item.commit();
    }
  }
}
