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
  readonly a3p_url_1: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly a3p_url_2: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly a3p_url_3: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly a3p_url_4: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly a3p_url_5: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}
