import { UtilityImplement } from '@libs/utility.module';
import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IUser, UserImplement, UserProperties } from './user';

type createUserOptions = Readonly<{
  username: string;
  password: string;
  fullname?: string;
  email?: string;
}>;

export class UserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly util: UtilityImplement;

  create(options: createUserOptions): IUser {
    const common = {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      isDisabled: false,
      version: 0,
    };
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({
        ...options,
        password: this.util.passwordHash(options.password),
        fullname: options.fullname || null,
        email: options.email || null,
        avatar: null,
        common,
      }),
    );
  }

  reconstitute(properties: UserProperties): IUser {
    return this.eventPublisher.mergeObjectContext(new UserImplement(properties));
  }
}
