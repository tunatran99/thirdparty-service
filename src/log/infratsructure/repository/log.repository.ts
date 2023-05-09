import { LogProperties } from 'src/log/domain/custom.log.implement';

export interface LogRepository {
  save: (data: LogProperties | LogProperties[]) => Promise<void>;
}
