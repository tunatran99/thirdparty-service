import { IsArray, IsString, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class FindSkuPricesRequestDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly skus: string[];
}
