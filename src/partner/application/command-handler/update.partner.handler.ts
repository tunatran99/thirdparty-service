import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { UpdatePartnerCommand } from '../command/update.partner.command';
import { PartnerRepositoryImplement } from 'src/partner/infratsructure/repository/partner.repository.implement';

@CommandHandler(UpdatePartnerCommand)
export class UpdatePartnerHandler implements ICommandHandler<UpdatePartnerCommand, void> {
  @Inject()
  private readonly partnerRepository: PartnerRepositoryImplement;

  @Transactional()
  async execute(command: UpdatePartnerCommand): Promise<void> {
    const { model } = await this.partnerRepository.findById(command.id);

    model.update({ name: command.name });

    await this.partnerRepository.save(model);

    model.commit();
  }
}
