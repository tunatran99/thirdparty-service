import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { logoutUser } from '../command/logout.user.command';
import { RefreshTokenRepositoryImplement } from 'src/user/infratsructure/repository/refresh.token.repository.implement';

@CommandHandler(logoutUser)
export class LogoutUserHandler implements ICommandHandler<logoutUser, void> {
  @Inject()
  private readonly refreshTokenRepository: RefreshTokenRepositoryImplement;

  @Transactional()
  async execute(command: logoutUser): Promise<void> {
    await this.refreshTokenRepository.remove(command.tokenId);
  }
}
