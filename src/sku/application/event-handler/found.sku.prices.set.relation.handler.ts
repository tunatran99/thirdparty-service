import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SkuPricesFoundByCodesEvent } from '../event/sku.prices.found.bycodes';
import { Transactional } from '@libs/transaction.decorator';
import { PartnerPricesRepositoryImplement } from 'src/sku/infratsructure/repository/partner.prices.repository.implement';
import { Inject } from '@nestjs/common';

@EventsHandler(SkuPricesFoundByCodesEvent)
export class FoundSkuPricesSetRelationEventHandler implements IEventHandler<SkuPricesFoundByCodesEvent> {
  @Inject()
  private readonly partnerPricesRepository: PartnerPricesRepositoryImplement;

  @Transactional()
  async handle(event: SkuPricesFoundByCodesEvent): Promise<void> {
    const entities = event.eventData.map((i) => {
      return {
        partnerId: i.partnerId,
        sku: i.sku,
        store: i.store,
      };
    });
    await this.partnerPricesRepository.save(entities);
  }
}
