import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { POFoundByCodesEvent } from '../event/po.found.bycodes';
import { Inject } from '@nestjs/common';
import { UtilityImplement } from '@libs/utility.module';

@EventsHandler(POFoundByCodesEvent)
export class POWriteFileEventHandler implements IEventHandler<POFoundByCodesEvent> {
  @Inject()
  private readonly util: UtilityImplement;

  async handle(event: POFoundByCodesEvent) {
    const filePath = `data/bookingapp/podata.xlsx`;
    const columns = [
      { key: 'purchase_code', header: 'purchase_code' },
      { key: 'supplier_code', header: 'supplier_code' },
      { key: 'department_code', header: 'department_code' },
      { key: 'purchase_date', header: 'purchase_date' },
      { key: 'contract_no', header: 'contract_no' },
      { key: 'branch_code', header: 'branch_code' },
      { key: 'tax_code', header: 'tax_code' },
      { key: 'sku_code', header: 'sku_code' },
      { key: 'unit', header: 'unit' },
      { key: 'purchase_number', header: 'purchase_number' },
    ];
    const data = event.eventData.items;
    await this.util.writeExcelFile(columns, data, filePath);
  }
}
