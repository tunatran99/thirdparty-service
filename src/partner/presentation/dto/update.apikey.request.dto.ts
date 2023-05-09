import { IsNumber, IsString } from 'class-validator';

export class updateApikeyRequestDTO {
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly key: string;
  @IsString()
  readonly description: string;
}
