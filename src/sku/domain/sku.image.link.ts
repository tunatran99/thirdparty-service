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
    pop_url_1: string;
    pop_url_2: string;
    pop_url_3: string;
    a3p_url_1: string;
    a3p_url_2: string;
    a3p_url_3: string;
    a3p_url_4: string;
    a3p_url_5: string;
    active: number;
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
