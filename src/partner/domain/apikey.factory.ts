import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IApikey, ApikeyImplement, ApikeyProperties } from './apikey';
import { v4 } from 'uuid';

type createApikeyOptions = Readonly<{
  description: string;
  partnerId: number;
}>;

export class ApikeyFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: createApikeyOptions): IApikey {
    const common = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new ApikeyImplement({
        ...options,

        key: v4(),

        common,
      }),
    );
  }

  reconstitute(properties: ApikeyProperties): IApikey {
    return this.eventPublisher.mergeObjectContext(new ApikeyImplement(properties));
  }
}
