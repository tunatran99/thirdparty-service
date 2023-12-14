import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class DefaultEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;
  @Column({ default: false })
  disabled?: boolean;
  @Column({ default: () => 'CURRENT_TIMESTAMP()' })
  createdDate?: Date;
  @Column({ nullable: true })
  createdBy?: number;
  @Column({ nullable: true, onUpdate: 'CURRENT_TIMESTAMP()' })
  modifiedDate?: Date;
  @Column({ nullable: true })
  modifiedBy?: number;
}
