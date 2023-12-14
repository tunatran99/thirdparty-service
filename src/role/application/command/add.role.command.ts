import { ICommand } from '@nestjs/cqrs';
import { PermissionEntity } from 'src/role/infratsructure/entity/permission';

export class addRole implements ICommand {
  constructor(readonly code: string, readonly permissions: PermissionEntity[], readonly description?: string) {}
}
