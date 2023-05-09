import { IsNumber, IsString } from 'class-validator';

export class createApikeyRequestDTO {
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly partnerId: number;
}
