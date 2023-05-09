import { CommonEntity } from '@libs/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';

export type ApikeyEssentialProperties = Readonly<
  Required<{
    key: string;
    description: string;
    partnerId: number;

    common: CommonEntity;
  }>
>;

export type ApikeyOptionalProperties = Readonly<
  Partial<{
    id: number;
  }>
>;

export type ApikeyProperties = ApikeyEssentialProperties & ApikeyOptionalProperties;

export interface IApikey {
  create: () => void;
  update: (data: Partial<ApikeyProperties>) => void;
  commit: () => void;
}

export class ApikeyImplement extends AggregateRoot implements IApikey {
  private readonly id: number;
  private description: string;

  constructor(properties: ApikeyProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new ApikeyOpenedEvent(this.id, this.email));
  }

  update(data: Partial<ApikeyProperties>): void {
    Object.assign(this, data);
  }
}
