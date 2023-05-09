import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { UpdateApikeyCommand } from '../command/update.apikey.command';
import { ApikeyRepositoryImplement } from 'src/partner/infratsructure/repository/apikey.repository.implement';

@CommandHandler(UpdateApikeyCommand)
export class UpdateApikeyHandler implements ICommandHandler<UpdateApikeyCommand, void> {
  @Inject()
  private readonly apikeyRepository: ApikeyRepositoryImplement;

  @Transactional()
  async execute(command: UpdateApikeyCommand): Promise<void> {
    const { model } = await this.apikeyRepository.findById(command.id);

    model.update({ key: command.key, description: command.description });

    await this.apikeyRepository.save(model);

    model.commit();
  }
}
