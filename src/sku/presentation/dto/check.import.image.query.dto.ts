import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CheckImportImageDTO {
  @IsNotEmpty()
  @IsString()
  readonly sku: string;

  @IsOptional()
  @IsString()
  readonly partner: string;
}
