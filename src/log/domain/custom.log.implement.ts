import { ConsoleLogger, Inject } from '@nestjs/common';
import { LogRepositoryImplement } from '../infratsructure/repository/log.repository.implement';

export class LogProperties {
  readonly isSystemCall: boolean;
  readonly partnerId: number;
  readonly ip: string;
  readonly url: string;
  readonly method: string;
  readonly statusCode: number;
  readonly isFailed: boolean;
  readonly requestHeader: string;
  readonly requestBody: string;
  readonly responseBody: string;

  constructor(data: Partial<LogProperties>) {
    Object.assign(this, data);
  }
}

export class CustomLogger extends ConsoleLogger {
  @Inject()
  private readonly logRepo: LogRepositoryImplement;

  async customLog(data: Partial<LogProperties>) {
    const logData = new LogProperties(data);
    await this.logRepo.save(logData);
  }
}
