import { ISkuImageLink } from 'src/sku/domain/sku.image.link';
import { SkuImageLinkEntity } from '../entity/sku_image_link';

export interface SkuImageLinkRepository {
  save: (data: ISkuImageLink | ISkuImageLink[]) => Promise<void>;
  findById: (id: number) => Promise<Record<string, SkuImageLinkEntity | ISkuImageLink> | null>;
  findByCode: (code: string, partnerId: number) => Promise<Record<string, SkuImageLinkEntity | ISkuImageLink> | null>;
  // findIdByCode: (code: string) => Promise<number> | null;
  findSkuIdByCode: (code: string) => Promise<number> | null;
}
