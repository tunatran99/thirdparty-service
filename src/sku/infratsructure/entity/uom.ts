import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ps_uom', synchronize: false })
export class UomEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  label: string;
  @Column()
  langcode: string;
  @Column({ default: 1 })
  status: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP()' })
  createdDate: Date;
  @Column({
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  lastUpdate: Date;
}
