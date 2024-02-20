import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ActiveImageRequestDTO {
  @Type(() => Number)
  @IsNumber()
  partnerId: number;

  @Type(() => Number)
  @IsNumber()
  skuId: number;
  
  @Type(() => Number)
  @IsNumber()
  active: number;
}
