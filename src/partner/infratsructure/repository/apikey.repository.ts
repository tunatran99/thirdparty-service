import { IApikey } from 'src/partner/domain/apikey';
import { ApikeyEntity } from '../entity/apikey';

export interface ApikeyRepository {
  save: (data: IApikey | IApikey[]) => Promise<void>;
  findById: (id: number) => Promise<Record<string, ApikeyEntity | IApikey> | null>;
  delete: (id: number) => Promise<void>;
}
