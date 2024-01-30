import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SaveImageLinkRequestDTO {
  @IsNumber()
  @IsNotEmpty()
  readonly skuId: number;

  @IsString()
  @IsNotEmpty()
  readonly skuCode: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly partner: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly png: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly jpeg: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly fileType: string;
}
