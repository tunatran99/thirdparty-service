import { IsBoolean, IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { Logger } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

export enum Environment {
  Local = 'local',
  Test = 'test',
  Production = 'production',
}

class EnvironmentVariables {
  private readonly logger = new Logger(EnvironmentVariables.name);

  @IsString()
  readonly APPNAME: string = process.env.APPNAME as string;

  @IsEnum(Environment)
  readonly NODE_ENV: Environment = process.env.NODE_ENV as Environment;

  @IsNumber()
  readonly PORT: number = Number(process.env.PORT);

  @IsString()
  readonly DB_HOST: string = process.env.DB_HOST as string;

  @IsNumber()
  readonly DB_PORT: number = Number(process.env.DB_PORT);

  @IsString()
  readonly DB_NAME: string = process.env.DB_NAME as string;

  @IsString()
  readonly DB_USERNAME: string = process.env.DB_USERNAME as string;

  @IsString()
  readonly DB_PASSWORD: string = process.env.DB_PASSWORD as string;

  @IsBoolean()
  readonly DB_LOGGING: boolean = process.env.DB_LOGGING === 'true';

  @IsBoolean()
  readonly DB_SYNC: boolean = process.env.DB_SYNC === 'true';

  @IsString()
  readonly JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET as string;

  @IsNumber()
  readonly JWT_ACCESS_EXPIRE: number = Number(process.env.JWT_ACCESS_EXPIRE);

  @IsString()
  readonly JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET as string;

  @IsNumber()
  readonly JWT_REFRESH_EXPIRE: number = Number(process.env.JWT_REFRESH_EXPIRE);

  @IsString()
  readonly MBAPP_HOST: string = process.env.MBAPP_HOST as string;

  @IsString()
  readonly MBAPP_APIKEY: string = process.env.MBAPP_APIKEY as string;

  @IsString()
  readonly BOOKINGAPP_HOST: string = process.env.BOOKINGAPP_HOST as string;

  @IsString()
  readonly BOOKINGAPP_APIKEY: string = process.env.BOOKINGAPP_APIKEY as string;

  @IsString()
  readonly SHOPEEFOOD_HOST: string = process.env.SHOPEEFOOD_HOST as string;

  @IsString()
  readonly SHOPEEFOOD_SECRET: string = process.env.SHOPEEFOOD_SECRET as string;
  
  @IsNumber()
  readonly API_CHUNK_SIZE: number = Number(process.env.API_CHUNK_SIZE);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

export const environment = new EnvironmentVariables();
