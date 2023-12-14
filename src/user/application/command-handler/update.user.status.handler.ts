import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { UserRepositoryImplement } from 'src/user/infratsructure/repository/user.repository.implement';
import { UpdateUserStatus } from '../command/update.user.status.command';

@CommandHandler(UpdateUserStatus)
export class UpdateUserStatusHandler implements ICommandHandler<UpdateUserStatus, void> {
  @Inject()
  private readonly userRepository: UserRepositoryImplement;

  @Transactional()
  async execute(command: UpdateUserStatus): Promise<void> {
    const { model, entity } = await this.userRepository.findById(command.id);

    entity.common.isDisabled = !entity.common.isDisabled

    model.update(entity);

    await this.userRepository.save(model);

    model.commit();
  }
}
