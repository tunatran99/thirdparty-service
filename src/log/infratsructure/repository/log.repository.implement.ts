import { writeConnection } from '@libs/database.module';
import { LogProperties } from 'src/log/domain/custom.log.implement';
import { LogEntity } from '../entity/log';
import { LogRepository } from './log.repository';

export class LogRepositoryImplement implements LogRepository {
  async save(data: LogProperties | LogProperties[]): Promise<void> {
    const entities = Array.isArray(data) ? data : [data];
    await writeConnection.manager.getRepository(LogEntity).save(entities);
  }
}
