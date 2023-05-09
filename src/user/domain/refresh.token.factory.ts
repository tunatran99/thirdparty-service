import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IRefreshToken, RefreshTokenImplement, RefreshTokenProperties } from './refresh.token';

type createRefreshTokenOptions = Readonly<{
  userId: number;
  tokenId: string;
}>;

export class RefreshTokenFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: createRefreshTokenOptions): IRefreshToken {
    const common = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new RefreshTokenImplement({
        ...options,
        common,
      }),
    );
  }

  reconstitute(properties: RefreshTokenProperties): IRefreshToken {
    return this.eventPublisher.mergeObjectContext(new RefreshTokenImplement(properties));
  }
}
