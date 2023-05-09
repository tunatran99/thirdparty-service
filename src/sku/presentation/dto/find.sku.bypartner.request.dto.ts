import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindSkuByPartnerRequestDTO {
  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @Type(() => Number)
  @IsNumber()
  partnerId: number;
  @Type(() => String)
  @IsString()
  @IsOptional()
  storeId?: string;
}
