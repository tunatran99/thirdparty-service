import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDTO {
  @IsOptional()
  @IsString()
  readonly search?: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly offset?: number;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly limit?: number;
}
