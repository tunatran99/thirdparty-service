import { IsNumber, IsString } from 'class-validator';

export class updatePartnerRequestDTO {
  @IsNumber()
  readonly id: number;
  @IsString()
  readonly name: string;
}
