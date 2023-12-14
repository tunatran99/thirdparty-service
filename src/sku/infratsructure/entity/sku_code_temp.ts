import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sku_code_temp', synchronize: false })
export class SkuCodeTempEntity {
  @PrimaryColumn()
  SKU_CODE?: string;
}
