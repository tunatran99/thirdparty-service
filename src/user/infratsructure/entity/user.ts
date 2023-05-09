import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';

import { BaseEntity, CommonEntity } from '@libs/base.entity';
import { UserRefreshTokenEntity } from './refresh.token';

@Entity({ name: 'ps_user', synchronize: true })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  email: string;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  @OneToMany(() => UserRefreshTokenEntity, (t) => t.user, {
    eager: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  refreshTokens?: UserRefreshTokenEntity[];
}
