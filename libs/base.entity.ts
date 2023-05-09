import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;
}

export class CommonEntity {
  @CreateDateColumn()
  createdAt: Date;

  // @Column({ nullable: true })
  // createdBy: number | null;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null;

  // @Column({ nullable: true })
  // updatedBy: number | null;

  @Column()
  isDisabled: boolean;

  @VersionColumn()
  version: number;
}
