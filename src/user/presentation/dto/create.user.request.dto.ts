import { IsArray, IsOptional, IsString } from 'class-validator';

export class createUserRequestDTO {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly fullname?: string;

  @IsOptional()
  @IsArray()
  readonly email?: string;
}
