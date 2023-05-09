import { FindLogResult } from 'src/log/application/query/find.log.result';

export interface LogQuery {
  find: (offset: number, limit: number, search?: string) => Promise<FindLogResult>;
}
