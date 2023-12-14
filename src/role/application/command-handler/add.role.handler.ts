import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { RoleFactory } from 'src/role/domain/role.factory';
import { RoleRepositoryImplement } from 'src/role/infratsructure/repository/role.repository.implement';
import { addRole } from '../command/add.role.command';

@CommandHandler(addRole)
export class AddRoleHandler implements ICommandHandler<addRole, void> {
  @Inject()
  private readonly roleRepository: RoleRepositoryImplement;
  @Inject() private readonly roleFactory: RoleFactory;

  @Transactional()
  async execute(command: addRole): Promise<void> {
    const role = this.roleFactory.create({
      ...command,
    });

    role.create();

    await this.roleRepository.save(role);

    role.commit();
  }
}
