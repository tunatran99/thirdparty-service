import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestDTO {
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsArray()
  readonly roles?: [];

  @IsOptional()
  @IsString()
  readonly fullname?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  readonly currentPassword?: string;

  @IsOptional()
  @IsString()
  readonly newPassword?: string;
  
  @IsOptional()
  @IsArray()
  readonly storeId?: string[];

  @IsOptional()
  @IsArray()
  readonly partnerId?: number[];
}
