import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierFoundByCodesEvent } from '../event/supplier.found.bycodes';
import { BookingappService } from 'src/bookingapp/domain/bookingapp.service';
import { serviceDownloadPath } from 'src/bookingapp/domain/bookingapp.servicepath.enum';

@EventsHandler(SupplierFoundByCodesEvent)
export class SupplierCallBAEventHandler implements IEventHandler<SupplierFoundByCodesEvent> {
  constructor(private readonly baService: BookingappService) {}
  async handle(event: SupplierFoundByCodesEvent) {
    await this.baService.callBookingApp(event.eventData.items, serviceDownloadPath.supplier);
  }
}
