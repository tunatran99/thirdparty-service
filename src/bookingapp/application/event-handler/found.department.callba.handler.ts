import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DepartmentFoundByCodesEvent } from '../event/department.found.bycodes';
import { BookingappService } from 'src/bookingapp/domain/bookingapp.service';
import { serviceDownloadPath } from 'src/bookingapp/domain/bookingapp.servicepath.enum';

@EventsHandler(DepartmentFoundByCodesEvent)
export class DepartmentCallBAEventHandler implements IEventHandler<DepartmentFoundByCodesEvent> {
  constructor(private readonly baService: BookingappService) {}
  async handle(event: DepartmentFoundByCodesEvent) {
    await this.baService.callBookingApp(event.eventData.items, serviceDownloadPath.department);
  }
}
