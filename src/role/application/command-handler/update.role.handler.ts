import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { UtilityImplement } from 'libs/utility.module';
import { RoleRepositoryImplement } from 'src/role/infratsructure/repository/role.repository.implement';
import { UpdateRole } from '../command/update.role.command';

@CommandHandler(UpdateRole)
export class UpdateRoleHandler implements ICommandHandler<UpdateRole, void> {
  @Inject()
  private readonly roleRepository: RoleRepositoryImplement;
  @Inject() private readonly util: UtilityImplement;

  @Transactional()
  async execute(command: UpdateRole): Promise<void> {
    const { model } = await this.roleRepository.findById(command.id);

    model.update({ permissions: command.permissions, desc: command.description });

    await this.roleRepository.save(model);

    model.commit();
  }
}
