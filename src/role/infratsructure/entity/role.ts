import { DefaultEntity } from '@libs/default_entity';
import { UserEntity } from 'src/user/infratsructure/entity/user';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PermissionEntity } from './permission';

@Entity({ name: 'ps_role', synchronize: false })
export class RoleEntity extends DefaultEntity {
  @Column()
  code: string;
  @Column({ nullable: true })
  desc: string;

  @ManyToMany(() => UserEntity, (t) => t.roles, {
    eager: false,
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'ps_role_user',
  })
  users?: UserEntity[];

  @ManyToMany(() => PermissionEntity, (t) => t.roles, {
    eager: false,
    cascade: ['insert', 'update'],
  })
  permissions: PermissionEntity[];
}
