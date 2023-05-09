import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ps_partner_price', synchronize: true })
export class PartnerPriceEntity {
  @PrimaryColumn()
  partnerId: number;
  @PrimaryColumn({ length: 45, charset: 'utf8' })
  sku: string;
  @PrimaryColumn({ length: 45, charset: 'utf8' })
  store: string;
  @Column({ default: true })
  active?: boolean;
}
