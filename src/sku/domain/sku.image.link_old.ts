import { AggregateRoot } from '@nestjs/cqrs';
import { CommonEntity } from 'libs/base.entity';

export type SkuImageLinkOldEssentialProperties = Readonly<
  Required<{
    skuId: number;
    skuCode: string;

    common: CommonEntity;
  }>
>;

export type SkuImageLinkOldOptionalProperties = Readonly<
  Partial<{
    id: number;
    partnerId: number;
    url: string;
  }>
>;

export type SkuImageLinkOldProperties = SkuImageLinkOldEssentialProperties & SkuImageLinkOldOptionalProperties;

export interface ISkuImageLinkOld {
  create: () => void;
  update: (data: Partial<SkuImageLinkOldProperties>) => void;
  commit: () => void;
}

export class SkuImageLinkOldImplement extends AggregateRoot implements ISkuImageLinkOld {
  constructor(properties: SkuImageLinkOldProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new SkuImageLinkOpenedEvent(this.id, this.email));
  }

  update(data: Partial<SkuImageLinkOldProperties>): void {
    Object.assign(this, data);
  }
}
