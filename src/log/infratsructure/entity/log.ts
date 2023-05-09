import { Entity, Column, CreateDateColumn } from 'typeorm';

import { BaseEntity } from '@libs/base.entity';

@Entity({ name: 'ps_log', synchronize: true })
export class LogEntity extends BaseEntity {
  @Column()
  isSystemCall: boolean;

  @Column({ nullable: true })
  partnerId: number;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  statusCode: number;

  @Column()
  isFailed: boolean;

  @Column({ nullable: true, type: 'text' })
  requestHeader: string;

  @Column({ nullable: true, type: 'text' })
  requestBody: string;

  @Column({ nullable: true, type: 'text' })
  responseBody: string;

  @Column({ nullable: true })
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;
}
