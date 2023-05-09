import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from '@libs/transaction.decorator';
import { CreateApikeyCommand } from '../command/create.apikey.command';
import { ApikeyFactory } from 'src/partner/domain/apikey.factory';
import { ApikeyRepositoryImplement } from 'src/partner/infratsructure/repository/apikey.repository.implement';

@CommandHandler(CreateApikeyCommand)
export class CreateApikeyHandler implements ICommandHandler<CreateApikeyCommand, void> {
  @Inject()
  private readonly apikeyRepository: ApikeyRepositoryImplement;
  @Inject() private readonly apikeyFactory: ApikeyFactory;

  @Transactional()
  async execute(command: CreateApikeyCommand): Promise<void> {
    const apikey = this.apikeyFactory.create({
      ...command,
    });

    apikey.create();

    await this.apikeyRepository.save(apikey);

    apikey.commit();
  }
}
