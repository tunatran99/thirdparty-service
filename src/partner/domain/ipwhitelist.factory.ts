import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IIpWhitelist, IpWhitelistImplement, IpWhitelistProperties } from './ipwhitelist';

type createIpWhitelistOptions = Readonly<{
  ip: string;
  description: string;
  partnerId: number;
}>;

export class IpWhitelistFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: createIpWhitelistOptions): IIpWhitelist {
    const common = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new IpWhitelistImplement({
        ...options,
        common,
      }),
    );
  }

  reconstitute(properties: IpWhitelistProperties): IIpWhitelist {
    return this.eventPublisher.mergeObjectContext(new IpWhitelistImplement(properties));
  }
}
