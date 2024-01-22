import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsOptional()
  @IsString()
  readonly categoryCode?: string;
  @IsOptional()
  @IsString()
  readonly categoryName?: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly categorySequence?: number;
  @IsOptional()
  @IsString()
  readonly active?: string;
  @IsOptional()
  @IsString()
  readonly categoryAncestor?: string;
}
