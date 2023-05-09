import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductFoundByCodesEvent } from '../event/product.found.bycodes';
import { Inject } from '@nestjs/common';
import { UtilityImplement } from '@libs/utility.module';

@EventsHandler(ProductFoundByCodesEvent)
export class ProductWriteFileEventHandler implements IEventHandler<ProductFoundByCodesEvent> {
  @Inject()
  private readonly util: UtilityImplement;

  async handle(event: ProductFoundByCodesEvent) {
    const filePath = `data/bookingapp/productdata.xlsx`;
    const columns = [
      { key: 'sku_code', header: 'sku_code' },
      { key: 'product_name', header: 'product_name' },
      { key: 'product_status', header: 'product_status' },
    ];
    const data = event.eventData.items;
    await this.util.writeExcelFile(columns, data, filePath);
  }
}
