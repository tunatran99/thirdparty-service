import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { CreatePartnerCommand } from '../command/create.partner.command';
import { PartnerFactory } from 'src/partner/domain/partner.factory';
import { PartnerRepositoryImplement } from 'src/partner/infratsructure/repository/partner.repository.implement';

@CommandHandler(CreatePartnerCommand)
export class CreatePartnerHandler implements ICommandHandler<CreatePartnerCommand, void> {
  @Inject()
  private readonly partnerRepository: PartnerRepositoryImplement;
  @Inject() private readonly partnerFactory: PartnerFactory;

  @Transactional()
  async execute(command: CreatePartnerCommand): Promise<void> {
    const partner = this.partnerFactory.create({
      ...command,
    });

    partner.create();

    await this.partnerRepository.save(partner);

    partner.commit();
  }
}
