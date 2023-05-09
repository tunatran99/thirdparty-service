import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProfile } from '../query/find.profile.query';
import { UserQueryImplement } from 'src/user/infratsructure/query/sku.prices.query.implement';
import { FindProfileResult } from '../query/find.profile.query.result';

@QueryHandler(FindProfile)
export class FindProfileHandler implements IQueryHandler<FindProfile, FindProfileResult> {
  @Inject()
  private readonly userQuery: UserQueryImplement;

  async execute(command: FindProfile): Promise<FindProfileResult> {
    const user = await this.userQuery.findProfileById(command.userId);
    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      avatar: user.avatar,
      email: user.email,
    };
  }
}
