import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';

import { BaseEntity, CommonEntity } from '@libs/base.entity';
import { ApikeyEntity } from './apikey';
import { IpWhitelistEntity } from './ipwhitelist';

@Entity({ name: 'ps_partner', synchronize: true })
export class PartnerEntity extends BaseEntity {
  @Column()
  name: string;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  @OneToMany(() => ApikeyEntity, (t) => t.partner, {
    eager: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'partnerId' })
  apikeys?: ApikeyEntity[];

  @OneToMany(() => IpWhitelistEntity, (t) => t.partner, {
    eager: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'partnerId' })
  ipWhitelists?: IpWhitelistEntity[];
}
