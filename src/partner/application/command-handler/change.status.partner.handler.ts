import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { PartnerRepositoryImplement } from 'src/partner/infratsructure/repository/partner.repository.implement';
import { ChangeStatusPartnerCommand } from '../command/change.status.partner.command';

@CommandHandler(ChangeStatusPartnerCommand)
export class ChangeStatusPartnerHandler implements ICommandHandler<ChangeStatusPartnerCommand, void> {
  @Inject()
  private readonly partnerRepository: PartnerRepositoryImplement;

  @Transactional()
  async execute(command: ChangeStatusPartnerCommand): Promise<void> {
    const { model } = await this.partnerRepository.findById(command.id);

    model.changeStatus();

    await this.partnerRepository.save(model);

    model.commit();
  }
}
