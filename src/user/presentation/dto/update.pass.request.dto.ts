import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePassRequestDTO {
  @IsNumber()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly currentPassword?: string;
  
  @IsString()
  readonly newPassword?: string;
}
