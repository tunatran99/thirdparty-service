import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ItemFoundByCodesEvent } from '../event/item.found.bycodes';
import { BookingappService } from 'src/bookingapp/domain/bookingapp.service';
import { serviceDownloadPath } from 'src/bookingapp/domain/bookingapp.servicepath.enum';

@EventsHandler(ItemFoundByCodesEvent)
export class ItemCallBAEventHandler implements IEventHandler<ItemFoundByCodesEvent> {
  constructor(private readonly baService: BookingappService) {}
  async handle(event: ItemFoundByCodesEvent) {
    await this.baService.callBookingApp(event.eventData.items, serviceDownloadPath.department);
  }
}
