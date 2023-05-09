import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SupplierFoundByCodesEvent } from '../event/supplier.found.bycodes';
import { Inject } from '@nestjs/common';
import { UtilityImplement } from '@libs/utility.module';

@EventsHandler(SupplierFoundByCodesEvent)
export class SupplierWriteFileEventHandler implements IEventHandler<SupplierFoundByCodesEvent> {
  @Inject()
  private readonly util: UtilityImplement;

  async handle(event: SupplierFoundByCodesEvent) {
    const filePath = `data/bookingapp/supplierdata.xlsx`;
    const columns = [
      { key: 'supplier_code', header: 'supplier_code' },
      { key: 'supplier_status', header: 'supplier_status' },
      { key: 'contract_no', header: 'contract_no' },
      { key: 'supplier_name', header: 'supplier_name' },
      { key: 'supplier_email', header: 'supplier_email' },
      { key: 'supplier_phone', header: 'supplier_phone' },
      { key: 'branch_code', header: 'branch_code' },
      { key: 'tax_code', header: 'tax_code' },
      { key: 'branch_status', header: 'branch_status' },
    ];
    const data = [];
    for (const sup of event.eventData.items) {
      for (const brand of sup.branch_list) {
        data.push({
          supplier_code: sup.supplier_code,
          supplier_status: sup.supplier_status,
          contract_no: sup.contract_no,
          ...brand,
        });
      }
    }
    await this.util.writeExcelFile(columns, data, filePath);
  }
}
