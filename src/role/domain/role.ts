import { AggregateRoot } from '@nestjs/cqrs';
import { PermissionEntity } from '../infratsructure/entity/permission';

export type RoleEssentialProperties = Readonly<
  Required<{
    code: string;
    permissions: PermissionEntity[];
  }>
>;

export type RoleOptionalProperties = Readonly<
  Partial<{
    desc: string;
  }>
>;

export type RoleProperties = RoleEssentialProperties & RoleOptionalProperties;

export interface IRole {
  create: () => void;
  update: (data: Partial<RoleProperties>) => void;
  commit: () => void;
}

export class RoleImplement extends AggregateRoot implements IRole {
  private readonly id: number;
  private code: string;
  private desc: string;

  private permissions: PermissionEntity[];

  constructor(properties: RoleProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new RoleOpenedEvent(this.id, this.email));
  }

  update(data: Partial<RoleProperties>): void {
    Object.assign(this, data);
  }
}
