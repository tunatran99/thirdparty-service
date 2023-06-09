import { IsOptional } from 'class-validator';

export class createMenuRequestDTO {
  @IsOptional()
  readonly parentId?: File;
}
