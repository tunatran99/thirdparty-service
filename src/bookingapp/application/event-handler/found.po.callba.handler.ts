import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { POFoundByCodesEvent } from '../event/po.found.bycodes';
import { BookingappService } from 'src/bookingapp/domain/bookingapp.service';
import { serviceDownloadPath } from 'src/bookingapp/domain/bookingapp.servicepath.enum';

@EventsHandler(POFoundByCodesEvent)
export class POCallBAEventHandler implements IEventHandler<POFoundByCodesEvent> {
  constructor(private readonly baService: BookingappService) {}
  async handle(event: POFoundByCodesEvent) {
    await this.baService.callBookingApp(event.eventData.items, serviceDownloadPath.purchaseOrder);
  }
}
