import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { RefreshTokenFactory } from 'src/user/domain/refresh.token.factory';
import { RefreshTokenRepositoryImplement } from 'src/user/infratsructure/repository/refresh.token.repository.implement';
import { createRefreshToken } from '../command/create.refresh.token.command';

@CommandHandler(createRefreshToken)
export class CreateRefreshTokenHandler implements ICommandHandler<createRefreshToken, void> {
  @Inject()
  private readonly refreshtokenRepository: RefreshTokenRepositoryImplement;
  @Inject() private readonly refreshtokenFactory: RefreshTokenFactory;

  @Transactional()
  async execute(command: createRefreshToken): Promise<void> {
    const refreshToken = this.refreshtokenFactory.create({
      ...command,
    });

    refreshToken.create();

    await this.refreshtokenRepository.save(refreshToken);

    refreshToken.commit();
  }
}
