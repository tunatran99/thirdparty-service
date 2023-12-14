import { Entity, Column, OneToMany, JoinColumn, ManyToMany } from 'typeorm';

import { BaseEntity, CommonEntity } from '@libs/base.entity';
import { UserRefreshTokenEntity } from './refresh.token';
import { RoleEntity } from 'src/role/infratsructure/entity/role';

@Entity({ name: 'ps_user', synchronize: false })
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

  @Column({ nullable: true })
  storeId?: string;

  @Column({ nullable: true })
  partnerId?: string;

  @Column(() => CommonEntity, { prefix: false })
  common: CommonEntity;

  @OneToMany(() => UserRefreshTokenEntity, (t) => t.user, {
    eager: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  refreshTokens?: UserRefreshTokenEntity[];

  @ManyToMany(() => RoleEntity, (t) => t.users, {
    eager: false,
    cascade: ['insert', 'update'],
  })
  roles: RoleEntity[];
}
