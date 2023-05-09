import { CommonEntity } from '@libs/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';

export type PartnerEssentialProperties = Readonly<
  Required<{
    name: string;

    common: CommonEntity;
  }>
>;

export type PartnerOptionalProperties = Readonly<
  Partial<{
    id: number;
  }>
>;

export type PartnerProperties = PartnerEssentialProperties & PartnerOptionalProperties;

export interface IPartner {
  create: () => void;
  update: (data: Partial<PartnerProperties>) => void;
  changeStatus: () => void;
  commit: () => void;
}

export class PartnerImplement extends AggregateRoot implements IPartner {
  private readonly id: number;
  private name: string;
  private common: CommonEntity;

  constructor(properties: PartnerProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new PartnerOpenedEvent(this.id, this.email));
  }

  update(data: Partial<PartnerProperties>): void {
    Object.assign(this, data);
  }

  changeStatus(): void {
    this.common.isDisabled = !this.common.isDisabled;
  }
}
