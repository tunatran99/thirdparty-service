import { Inject } from '@nestjs/common';
import { readConnection, writeConnection } from 'libs/database.module';
import { IRole, RoleProperties } from 'src/role/domain/role';
import { RoleFactory } from 'src/role/domain/role.factory';
import { RoleEntity } from '../entity/role';
import { RoleRepository } from './role.repository';

export class RoleRepositoryImplement implements RoleRepository {
  @Inject() private readonly roleFactory: RoleFactory;

  async save(data: IRole | IRole[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => {
      const properties = JSON.parse(JSON.stringify(model)) as RoleProperties;
      return {
        ...properties,
      };
    });
    await writeConnection.manager.getRepository(RoleEntity).save(entities);
  }

  async remove(id: number): Promise<void> {
    await writeConnection.manager.getRepository(RoleEntity).delete({ id });
  }

  async findById(id: number): Promise<{ entity: RoleEntity; model: IRole }> | null {
    const entity = await readConnection
      .getRepository(RoleEntity)
      .createQueryBuilder('t1')
      .leftJoinAndSelect('t1.permissions', 't2')
      .where('t1.id = :id', { id })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  // private modelToEntity(model: IRole): Role {
  //   const properties = JSON.parse(JSON.stringify(model)) as RoleProperties;
  //   return {
  //     ...properties,
  //   };
  // }

  private entityToModel(entity: RoleEntity): IRole {
    return this.roleFactory.reconstitute({
      ...entity,
    });
  }
}
