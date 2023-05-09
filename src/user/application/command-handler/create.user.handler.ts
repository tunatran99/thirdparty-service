import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { UserFactory } from 'src/user/domain/user.factory';
import { UserRepositoryImplement } from 'src/user/infratsructure/repository/user.repository.implement';
import { createUser } from '../command/create.user.command';

@CommandHandler(createUser)
export class CreateUserHandler implements ICommandHandler<createUser, void> {
  @Inject()
  private readonly userRepository: UserRepositoryImplement;
  @Inject() private readonly userFactory: UserFactory;

  @Transactional()
  async execute(command: createUser): Promise<void> {
    const user = this.userFactory.create({
      ...command,
    });

    user.create();

    await this.userRepository.save(user);

    user.commit();
  }
}
