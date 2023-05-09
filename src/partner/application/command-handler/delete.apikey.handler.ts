import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { DeleteApikeyCommand } from '../command/delete.apikey.command';
import { ApikeyRepositoryImplement } from 'src/partner/infratsructure/repository/apikey.repository.implement';

@CommandHandler(DeleteApikeyCommand)
export class DeleteApikeyHandler implements ICommandHandler<DeleteApikeyCommand, void> {
  @Inject()
  private readonly apikeyRepository: ApikeyRepositoryImplement;

  @Transactional()
  async execute(command: DeleteApikeyCommand): Promise<void> {
    await this.apikeyRepository.delete(command.id);
  }
}
