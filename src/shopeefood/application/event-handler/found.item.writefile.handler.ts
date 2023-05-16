import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ItemFoundByCodesEvent } from '../event/item.found.bycodes';
import { Inject } from '@nestjs/common';
import { UtilityImplement } from '@libs/utility.module';

@EventsHandler(ItemFoundByCodesEvent)
export class DepartmentWriteFileEventHandler implements IEventHandler<ItemFoundByCodesEvent> {
  @Inject()
  private readonly util: UtilityImplement;

  async handle(event: ItemFoundByCodesEvent) {
    const filePath = `data/bookingapp/departmentdata.xlsx`;
    const columns = [
      { key: 'line_code', header: 'line_code' },
      { key: 'department_code', header: 'department_code' },
      { key: 'department_name', header: 'department_name' },
      { key: 'department_status', header: 'department_status' },
    ];
    const data = event.eventData.items;
    await this.util.writeExcelFile(columns, data, filePath);
  }
}
