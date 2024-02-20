import { BaseEntity, CommonEntity } from 'libs/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'sku_image_link', synchronize: false })
export class SkuImageLinkEntity extends BaseEntity {
  @Column({ type: 'text' })
  pop_url_1?: string;

  @Column({ type: 'text' })
  pop_url_2?: string;

  @Column({ type: 'text' })
  pop_url_3?: string;

  @Column({ type: 'text' })
  a3p_url_1?: string;

  @Column({ type: 'text' })
  a3p_url_2?: string;

  @Column({ type: 'text' })
  a3p_url_3?: string;

  @Column({ type: 'text' })
  a3p_url_4?: string;

  @Column({ type: 'text' })
  a3p_url_5?: string;
  
  @Column()
  @Index()
  skuId: number;

  @Column({ type: 'varchar', length: 45 })
  @Index()
  skuCode: string;

  @Column()
  active?: number;

  @Column()
  partnerId?: number;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;
}
