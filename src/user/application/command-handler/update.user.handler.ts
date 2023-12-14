import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { UserRepositoryImplement } from 'src/user/infratsructure/repository/user.repository.implement';
import { UpdateUser } from '../command/update.user.command';
import { UtilityImplement } from '@libs/utility.module';

@CommandHandler(UpdateUser)
export class UpdateUserHandler implements ICommandHandler<UpdateUser, void> {
  @Inject()
  private readonly userRepository: UserRepositoryImplement;
  @Inject() private readonly util: UtilityImplement;

  @Transactional()
  async execute(command: UpdateUser): Promise<void> {
    const { model, entity } = await this.userRepository.findById(command.id);

    if (command.currentPassword && command.newPassword) {
      const pass = this.util.passwordVerify(command.currentPassword, entity.password);
      if (pass) {
        entity.password = this.util.passwordHash(command.newPassword);
        model.update({
          password: entity.password
        })
      } else {
        throw new HttpException(`Wrong Password`, HttpStatus.BAD_REQUEST);
      }
    }

    model.update({
      ...command,
      storeId: command.storeId?.toString(),
      partnerId: command.partnerId?.toString()
    });

    await this.userRepository.save(model);

    model.commit();
  }
}
