import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { UtilityImplement } from 'libs/utility.module';
import { UserRepositoryImplement } from 'src/user/infratsructure/repository/user.repository.implement';
import { UpdateUserPass } from '../command/update.pass.command';

@CommandHandler(UpdateUserPass)
export class UpdateUserPassHandler implements ICommandHandler<UpdateUserPass, void> {
  @Inject()
  private readonly userRepository: UserRepositoryImplement;
  @Inject() private readonly util: UtilityImplement;

  @Transactional()
  async execute(command: UpdateUserPass): Promise<void> {
    const { model, entity } = await this.userRepository.findById(command.id);

    entity.password = this.util.passwordHash(command.newPassword);

    model.update(entity);

    await this.userRepository.save(model);

    model.commit();
  }
}
