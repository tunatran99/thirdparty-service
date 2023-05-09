import { IsString } from 'class-validator';

export class createPartnerRequestDTO {
  @IsString()
  readonly name: string;
}
