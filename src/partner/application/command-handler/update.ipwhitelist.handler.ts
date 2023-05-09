import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { UpdateIpWhitelistCommand } from '../command/update.ipwhitelist.command';
import { IpWhitelistRepositoryImplement } from 'src/partner/infratsructure/repository/ipwhitelist.repository.implement';

@CommandHandler(UpdateIpWhitelistCommand)
export class UpdateIpWhitelistHandler implements ICommandHandler<UpdateIpWhitelistCommand, void> {
  @Inject()
  private readonly ipwhitelistRepository: IpWhitelistRepositoryImplement;

  @Transactional()
  async execute(command: UpdateIpWhitelistCommand): Promise<void> {
    const { model } = await this.ipwhitelistRepository.findById(command.id);

    model.update({ ip: command.ip, description: command.description });

    await this.ipwhitelistRepository.save(model);

    model.commit();
  }
}
