import { BaseEntity } from 'libs/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'uom' })
export class UOMEntity extends BaseEntity {
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  label: string;
  @Column()
  langcode: string;
  @Column()
  status: string;
  @Column()
  createdDate: string;
  @Column()
  lastUpdate: string;
  
  // @OneToMany(() => MenuEntity, (t) => t.templates, {
  //   eager: false,
  // })
  // @JoinColumn({ name: 'UOM', referencedColumnName: 'code' })
  // menu?: MenuEntity;

  // @OneToOne(() => MediaEntity, (t) => t.template, {
  //   eager: false,
  //   cascade: true,
  // })
  // media?: MediaEntity;

  // @OneToMany(() => ProjectEntity, (t) => t.template, {
  //   eager: false,
  // })
  // @JoinColumn({ name: 'id', referencedColumnName: 'templateId' })
  // projects?: ProjectEntity[];
}
