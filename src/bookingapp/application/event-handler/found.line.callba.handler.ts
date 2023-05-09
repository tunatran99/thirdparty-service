import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LineFoundByCodesEvent } from '../event/line.found.bycodes';
import { BookingappService } from 'src/bookingapp/domain/bookingapp.service';
import { serviceDownloadPath } from 'src/bookingapp/domain/bookingapp.servicepath.enum';

@EventsHandler(LineFoundByCodesEvent)
export class LineCallBAEventHandler implements IEventHandler<LineFoundByCodesEvent> {
  constructor(private readonly baService: BookingappService) {}
  async handle(event: LineFoundByCodesEvent) {
    await this.baService.callBookingApp(event.eventData.items, serviceDownloadPath.line);
  }
}
