import { IsArray, IsOptional, IsString } from 'class-validator';

export class createUserRequestDTO {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsArray()
  readonly roles: [];

  @IsOptional()
  @IsString()
  readonly fullname?: string;

  @IsOptional()
  readonly email?: string;

  @IsOptional()
  @IsArray()
  readonly storeId?: string[];

  @IsOptional()
  @IsArray()
  readonly partnerId?: number[];
}
