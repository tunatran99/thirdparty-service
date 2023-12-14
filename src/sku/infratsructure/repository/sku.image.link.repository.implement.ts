import { Inject } from '@nestjs/common';
import { readConnection, writeConnection } from 'libs/database.module';
import { ISkuImageLink, SkuImageLinkProperties } from 'src/sku/domain/sku.image.link';
import { SkuImageLinkFactory } from 'src/sku/domain/sku.image.link.factory';
import { SkuImageLinkEntity } from '../entity/sku_image_link';
import { SkuImageLinkRepository } from './sku.image.link.repository';

export class SkuImageLinkRepositoryImplement implements SkuImageLinkRepository {
  @Inject() private readonly mediaFactory: SkuImageLinkFactory;

  async save(data: ISkuImageLink | ISkuImageLink[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(SkuImageLinkEntity).save(entities);
  }

  async findById(id: number): Promise<{ entity: SkuImageLinkEntity; model: ISkuImageLink }> | null {
    const entity = await readConnection
      .getRepository(SkuImageLinkEntity)
      .createQueryBuilder('t1')
      .where('t1.id = :id', { id })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  async findByCode(code: string, partnerId: number): Promise<{ entity: SkuImageLinkEntity; model: ISkuImageLink }> | null {
    const entity = await readConnection
      .getRepository(SkuImageLinkEntity)
      .createQueryBuilder('t1')
      .where('t1.skuCode = :code and t1.partnerId = :partnerId', { code, partnerId })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  // async findIdByCode(code: string): Promise<number> | null {
  //   const entity = await readConnection
  //     .getRepository(SkuImageLinkEntity)
  //     .createQueryBuilder('t1')
  //     .select('t1.id', 'id')
  //     .where('t1.SKU_CODE = :code', { code })
  //     .getOne();
  //   return entity ? entity.id : null;
  // }

  async findSkuIdByCode(code: string): Promise<number> | null {
    const entity = await readConnection
      .getRepository(SkuImageLinkEntity)
      .createQueryBuilder('t1')
      .select('t1.skuId', 'skuId')
      .where('t1.skuCode = :code', { code })
      .getOne();
    return entity ? entity.skuId : null;
  }

  async delete(id: number): Promise<void> {
    await writeConnection.manager.getRepository(SkuImageLinkEntity).delete({ id });
  }

  private modelToEntity(model: ISkuImageLink): SkuImageLinkEntity {
    const properties = JSON.parse(JSON.stringify(model)) as SkuImageLinkProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: SkuImageLinkEntity): ISkuImageLink {
    return this.mediaFactory.reconstitute({
      ...entity,
    });
  }
}
