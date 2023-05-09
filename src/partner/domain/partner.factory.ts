import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IPartner, PartnerImplement, PartnerProperties } from './partner';

type createPartnerOptions = Readonly<{
  name: string;
}>;

export class PartnerFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: createPartnerOptions): IPartner {
    const common = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new PartnerImplement({
        ...options,

        common,
      }),
    );
  }

  reconstitute(properties: PartnerProperties): IPartner {
    return this.eventPublisher.mergeObjectContext(new PartnerImplement(properties));
  }
}
