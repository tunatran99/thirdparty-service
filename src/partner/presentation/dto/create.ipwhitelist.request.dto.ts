import { IsIP, IsNumber, IsString } from 'class-validator';

export class createIpWhitelistRequestDTO {
  @IsIP()
  readonly ip: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly partnerId: number;
}
