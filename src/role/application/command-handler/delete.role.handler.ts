import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { RoleRepositoryImplement } from 'src/role/infratsructure/repository/role.repository.implement';
import { deleteRole } from '../command/delete.role.command';

@CommandHandler(deleteRole)
export class DeleteRoleHandler implements ICommandHandler<deleteRole, void> {
  @Inject()
  private readonly roleRepository: RoleRepositoryImplement;

  @Transactional()
  async execute(command: deleteRole): Promise<void> {
    await this.roleRepository.remove(command.id);
  }
}
