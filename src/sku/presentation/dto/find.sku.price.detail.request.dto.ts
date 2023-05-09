import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class FindSkuPriceDetailRequestDTO {
  @Type(() => Number)
  @IsNumber()
  partnerId: number;
  @Type(() => String)
  @IsString()
  sku: string;
}
