import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { UtilityImplement } from 'libs/utility.module';
import { ISkuImageLink, SkuImageLinkImplement, SkuImageLinkProperties } from './sku.image.link';

type createSkuImageLinkOptions = Readonly<{
  skuId: number;
  skuCode: string;
  partnerId: number;
  pop_url_1?: string;
  pop_url_2?: string;
  pop_url_3?: string;
  a3p_url_1?: string;
  a3p_url_2?: string;
  a3p_url_3?: string;
  a3p_url_4?: string;
  a3p_url_5?: string;
  active?: number;
}>;

export class SkuImageLinkFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly util: UtilityImplement;

  create(options: createSkuImageLinkOptions): ISkuImageLink {
    const common = {
      createdAt: new Date(),
      createdById: null,
      updatedAt: null,
      updatedById: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new SkuImageLinkImplement({
        ...options,
        common,
      }),
    );
  }

  reconstitute(properties: SkuImageLinkProperties): ISkuImageLink {
    return this.eventPublisher.mergeObjectContext(new SkuImageLinkImplement(properties));
  }
}
