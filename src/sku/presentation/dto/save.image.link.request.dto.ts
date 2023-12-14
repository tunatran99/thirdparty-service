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

  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}
