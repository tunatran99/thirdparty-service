import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PermissionEntity } from 'src/role/infratsructure/entity/permission';

export class roleDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @Type(() => String)
  @IsString()
  code: string;
  @IsOptional()
  @Type(() => String)
  @IsString()
  desc: string;
  @IsOptional()
  permissions: PermissionEntity[];
}