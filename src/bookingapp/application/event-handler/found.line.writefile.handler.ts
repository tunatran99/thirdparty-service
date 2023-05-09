import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LineFoundByCodesEvent } from '../event/line.found.bycodes';
import { Inject } from '@nestjs/common';
import { UtilityImplement } from '@libs/utility.module';

@EventsHandler(LineFoundByCodesEvent)
export class LineWriteFileEventHandler implements IEventHandler<LineFoundByCodesEvent> {
  @Inject()
  private readonly util: UtilityImplement;

  async handle(event: LineFoundByCodesEvent) {
    const filePath = `data/bookingapp/linedata.xlsx`;
    const columns = [
      { key: 'line_code', header: 'line_code' },
      { key: 'line_name', header: 'line_name' },
      { key: 'line_status', header: 'line_status' },
    ];
    const data = event.eventData.items;
    await this.util.writeExcelFile(columns, data, filePath);
  }
}
