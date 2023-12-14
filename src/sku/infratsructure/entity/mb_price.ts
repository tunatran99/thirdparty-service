import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ps_mb_price', synchronize: false })
export class MBPriceEntity {
  @PrimaryColumn({ length: 45, charset: 'utf8' })
  sku: string;
  @PrimaryColumn({ length: 45, charset: 'utf8' })
  store: string;
  @Column()
  line: string;
  @Column()
  division: string;
  @Column()
  group: string;
  @Column()
  dept: string;
  @Column()
  category: string;
  @Column()
  status: string;
  @Column()
  member: string;
  @Column({ nullable: true })
  uomEn: string;
  @Column({ nullable: true })
  uomVn: string;

  @Column()
  normalPrice: string;
  @Column({ nullable: true })
  promoPrice: string;
  @Column({ nullable: true })
  oriPromoPrice: string; // Giá khuyến mãi gốc khi chưa áp dụng memberday
  @Column({ nullable: true })
  startTime: Date;
  @Column({ nullable: true })
  endTime: Date;
  @Column({ default: false })
  memberMark: boolean;

  @Column({ nullable: true })
  pcNo: string;
  @Column({ nullable: true })
  pcStatus?: string;
  @Column({ nullable: true })
  pcTransType: string;
  @Column({ nullable: true })
  pcType: string;
  @Column({ nullable: true })
  pcTypeValue: string;
  @Column({ nullable: true })
  pcPrice: string;
  @Column({ nullable: true })
  pcStartDate: string;
  @Column({ nullable: true })
  pcEndDate: string;
  @Column({ nullable: true })
  pcStartTime: string;
  @Column({ nullable: true })
  pcEndTime: string;

  @Column({ nullable: true })
  pcNormal?: string;
  @Column({ nullable: true })
  pcNormalStatus?: string;
  @Column({ nullable: true })
  pcNormalTransType: string;
  @Column({ nullable: true })
  pcNormalType: string;
  @Column({ nullable: true })
  pcNormalTypeValue: string;
  @Column({ nullable: true })
  pcNormalPrice: string;
  @Column({ nullable: true })
  pcNormalStartDate: string;
  @Column({ nullable: true })
  pcNormalEndDate: string;
  @Column({ nullable: true })
  pcNormalStartTime: string;
  @Column({ nullable: true })
  pcNormalEndTime: string;

  @Column({ nullable: true })
  gpcNo: string;
  @Column({ nullable: true })
  gpcStatus: string;
  @Column({ nullable: true })
  gpcTransType: string;
  @Column({ nullable: true })
  gpcType: string;
  @Column({ nullable: true })
  gpcTypeValue: string;
  @Column({ nullable: true })
  gpcPrice: string;
  @Column({ nullable: true })
  gpcStartDate: string;
  @Column({ nullable: true })
  gpcEndDate: string;
  @Column({ nullable: true })
  gpcStartTime: string;
  @Column({ nullable: true })
  gpcEndTime: string;

  @Column({ nullable: true })
  priceFrom: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP()' })
  createdDate: Date;
  @Column({
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  lastUpdate: Date;
}
