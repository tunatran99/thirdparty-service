import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import moment from 'moment';
import { UserQueryImplement } from 'src/user/infratsructure/query/user.query.implement';
import { FindAll } from '../query/find.all.query';
import { FindAllResult } from '../query/find.all.query.result';

@QueryHandler(FindAll)
export class FindAllHandler implements IQueryHandler<FindAll, FindAllResult> {
  @Inject()
  private readonly userQuery: UserQueryImplement;

  async execute(command: FindAll): Promise<any> {
    const { items, total } = await this.userQuery.findAll(command.search, command.offset, command.limit);
    return {
      items: items.map((item: { id: any; username: any; fullname: any; email: any; common: { createdAt: moment.MomentInput; isDisabled: any; }; roles: any[]; storeId: any; partnerId: any;}) => {
        return {
          id: item.id,
          username: item.username,
          fullname: item.fullname,
          email: item.email,
          createdAt: moment(item.common.createdAt).format("YYYYMMDD"),
          disabled: item.common.isDisabled,
          roles: item.roles.map((role: { code: any; }) => role.code),
          storeId: item.storeId,
          partnerId: item.partnerId
        }
      }),
      total
    }
  }
}
