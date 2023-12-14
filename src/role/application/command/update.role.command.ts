import { ICommand } from '@nestjs/cqrs';
import { PermissionEntity } from 'src/role/infratsructure/entity/permission';

export class UpdateRole implements ICommand {
  constructor(readonly id: number, readonly permissions: PermissionEntity[], readonly description?: string) {}
}
