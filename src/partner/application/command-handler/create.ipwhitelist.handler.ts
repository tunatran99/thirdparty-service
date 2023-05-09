import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { CreateIpWhitelistCommand } from '../command/create.ipwhitelist.command';
import { IpWhitelistFactory } from 'src/partner/domain/ipwhitelist.factory';
import { IpWhitelistRepositoryImplement } from 'src/partner/infratsructure/repository/ipwhitelist.repository.implement';

@CommandHandler(CreateIpWhitelistCommand)
export class CreateIpWhitelistHandler implements ICommandHandler<CreateIpWhitelistCommand, void> {
  @Inject()
  private readonly ipwhitelistRepository: IpWhitelistRepositoryImplement;
  @Inject() private readonly ipwhitelistFactory: IpWhitelistFactory;

  @Transactional()
  async execute(command: CreateIpWhitelistCommand): Promise<void> {
    const ipwhitelist = this.ipwhitelistFactory.create({
      ...command,
    });

    ipwhitelist.create();

    await this.ipwhitelistRepository.save(ipwhitelist);

    ipwhitelist.commit();
  }
}
