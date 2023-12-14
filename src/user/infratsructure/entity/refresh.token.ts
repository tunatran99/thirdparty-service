import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity, CommonEntity } from '@libs/base.entity';
import { UserEntity } from './user';

@Entity({ name: 'ps_user_refresh_token', synchronize: false })
export class UserRefreshTokenEntity extends BaseEntity {
  @Column()
  tokenId: string;

  @Column()
  userId: number;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  @ManyToOne(() => UserEntity, (t) => t.refreshTokens, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user?: UserEntity;
}
