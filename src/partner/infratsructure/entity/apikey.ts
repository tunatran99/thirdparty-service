import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity, CommonEntity } from '@libs/base.entity';
import { PartnerEntity } from './partner';

@Entity({ name: 'ps_partner_apikey', synchronize: false })
export class ApikeyEntity extends BaseEntity {
  @Column()
  key: string;

  @Column()
  description: string;

  @Column()
  partnerId: number;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  @ManyToOne(() => PartnerEntity, (t) => t.apikeys, {
    eager: false,
  })
  @JoinColumn({ name: 'partnerId', referencedColumnName: 'id' })
  partner?: PartnerEntity;
}
