import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { DeleteIpWhitelistCommand } from '../command/delete.ipwhitelist.command';
import { IpWhitelistRepositoryImplement } from 'src/partner/infratsructure/repository/ipwhitelist.repository.implement';

@CommandHandler(DeleteIpWhitelistCommand)
export class DeleteIpWhitelistHandler implements ICommandHandler<DeleteIpWhitelistCommand, void> {
  @Inject()
  private readonly ipwhitelistRepository: IpWhitelistRepositoryImplement;

  @Transactional()
  async execute(command: DeleteIpWhitelistCommand): Promise<void> {
    await this.ipwhitelistRepository.delete(command.id);
  }
}
