import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity, CommonEntity } from '@libs/base.entity';
import { PartnerEntity } from './partner';

@Entity({ name: 'ps_partner_ipwhitelist', synchronize: true })
export class IpWhitelistEntity extends BaseEntity {
  @Column()
  ip: string;

  @Column()
  description: string;

  @Column()
  partnerId: number;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  @ManyToOne(() => PartnerEntity, (t) => t.ipWhitelists, {
    eager: false,
  })
  @JoinColumn({ name: 'partnerId', referencedColumnName: 'id' })
  partner?: PartnerEntity;
}
