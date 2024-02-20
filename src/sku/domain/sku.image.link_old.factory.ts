import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { UtilityImplement } from 'libs/utility.module';
import { ISkuImageLinkOld, SkuImageLinkOldImplement, SkuImageLinkOldProperties } from './sku.image.link_old';

type createSkuImageLinkOldOptions = Readonly<{
  skuId: number;
  skuCode: string;
  partnerId: number;
  url?: string;
}>;

export class SkuImageLinkOldFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly util: UtilityImplement;

  create(options: createSkuImageLinkOldOptions): ISkuImageLinkOld {
    const common = {
      createdAt: new Date(),
      createdById: null,
      updatedAt: null,
      updatedById: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new SkuImageLinkOldImplement({
        ...options,
        common,
      }),
    );
  }

  reconstitute(properties: SkuImageLinkOldProperties): ISkuImageLinkOld {
    return this.eventPublisher.mergeObjectContext(new SkuImageLinkOldImplement(properties));
  }
}
