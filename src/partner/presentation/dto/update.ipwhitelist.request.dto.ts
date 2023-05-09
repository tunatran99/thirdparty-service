import { IsIP, IsNumber, IsString } from 'class-validator';

export class updateIpWhitelistRequestDTO {
  @IsNumber()
  readonly id: number;
  @IsIP()
  readonly ip: string;
  @IsString()
  readonly description: string;
}
