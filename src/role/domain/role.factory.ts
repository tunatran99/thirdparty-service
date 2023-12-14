import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { UtilityImplement } from 'libs/utility.module';
import { PermissionEntity } from '../infratsructure/entity/permission';
import { IRole, RoleImplement, RoleProperties } from './role';

type createRoleOptions = Readonly<{
  code: string;
  permissions: PermissionEntity[];
  desc?: string;
}>;

export class RoleFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly util: UtilityImplement;

  create(options: createRoleOptions): IRole {
    const common = {
      disabled: 0,
      createdDate: new Date(),
      createdBy: null,
      updatedDate: null,
      updatedBy: null
    };
    return this.eventPublisher.mergeObjectContext(
      new RoleImplement({
        ...options,
        code: options.code,
        permissions: options.permissions,
        desc: options.desc
      }),
    );
  }

  reconstitute(properties: RoleProperties): IRole {
    return this.eventPublisher.mergeObjectContext(new RoleImplement(properties));
  }
}
