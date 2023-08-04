import { IsArray, IsString, ArrayMinSize, IsNotEmpty, IsOptional } from 'class-validator';

export class FindSkuPricesRequestDTO {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly skus?: string[];
}
