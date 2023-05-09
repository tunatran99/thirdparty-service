import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductFoundByCodesEvent } from '../event/product.found.bycodes';
import { BookingappService } from 'src/bookingapp/domain/bookingapp.service';
import { serviceDownloadPath } from 'src/bookingapp/domain/bookingapp.servicepath.enum';

@EventsHandler(ProductFoundByCodesEvent)
export class ProductCallBAEventHandler implements IEventHandler<ProductFoundByCodesEvent> {
  constructor(private readonly baService: BookingappService) {}
  async handle(event: ProductFoundByCodesEvent) {
    await this.baService.callBookingApp(event.eventData.items, serviceDownloadPath.product);
  }
}
