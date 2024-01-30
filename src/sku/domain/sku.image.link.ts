import { AggregateRoot } from '@nestjs/cqrs';
import { CommonEntity } from 'libs/base.entity';

export type SkuImageLinkEssentialProperties = Readonly<
  Required<{
    skuId: number;
    skuCode: string;

    common: CommonEntity;
  }>
>;

export type SkuImageLinkOptionalProperties = Readonly<
  Partial<{
    id: number;
    partnerId: number;
    png: string;
    jpeg: string;
  }>
>;

export type SkuImageLinkProperties = SkuImageLinkEssentialProperties & SkuImageLinkOptionalProperties;

export interface ISkuImageLink {
  create: () => void;
  update: (data: Partial<SkuImageLinkProperties>) => void;
  commit: () => void;
}

export class SkuImageLinkImplement extends AggregateRoot implements ISkuImageLink {
  constructor(properties: SkuImageLinkProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new SkuImageLinkOpenedEvent(this.id, this.email));
  }

  update(data: Partial<SkuImageLinkProperties>): void {
    Object.assign(this, data);
  }
}
