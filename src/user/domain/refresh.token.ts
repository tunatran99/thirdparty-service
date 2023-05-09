import { CommonEntity } from '@libs/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';

export type RefreshTokenEssentialProperties = Readonly<
  Required<{
    userId: number;
    tokenId: string;

    common: CommonEntity;
  }>
>;

export type RefreshTokenOptionalProperties = Readonly<
  Partial<{
    id: number;
  }>
>;

export type RefreshTokenProperties = RefreshTokenEssentialProperties & RefreshTokenOptionalProperties;

export interface IRefreshToken {
  create: () => void;
  commit: () => void;
}

export class RefreshTokenImplement extends AggregateRoot implements IRefreshToken {
  private readonly id: number;

  constructor(properties: RefreshTokenProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new RefreshTokenOpenedEvent(this.id, this.email));
  }
}
