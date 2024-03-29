import { BaseEntity, CommonEntity } from 'libs/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'pop_sku_image_link', synchronize: false })
export class SkuImageLinkOldEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 4000 })
  url?: string;
  
  @Column()
  @Index()
  skuId: number;

  @Column({ type: 'varchar', length: 45 })
  @Index()
  skuCode: string;

  @Column()
  partnerId?: number;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  // @OneToOne(() => ProjectAppliedSkuEntity, (s) => s.SKU_IMAGE, {
  //   eager: false,
  //   cascade: ['insert', 'update'],
  // })
  // PROJECT_APPLIED_SKU?: ProjectAppliedSkuEntity;
}
