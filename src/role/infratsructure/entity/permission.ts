import { DefaultEntity } from '@libs/default_entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEntity } from './role';

@Entity({ name: 'ps_permission', synchronize: false })
export class PermissionEntity extends DefaultEntity {
  @Column()
  code: string;
  @Column({ nullable: true })
  desc: string;

  @ManyToMany(() => RoleEntity, (t) => t.permissions, {
    eager: false,
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'ps_role_permission',
  })
  roles: RoleEntity[];
}
