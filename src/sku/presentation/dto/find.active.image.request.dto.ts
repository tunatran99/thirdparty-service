import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindActiveImageRequestDTO {
  @Type(() => Number)
  @IsNumber()
  partnerId: number;

  @Type(() => Number)
  @IsNumber()
  skuId: number;
}
