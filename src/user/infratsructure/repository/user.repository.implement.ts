import { readConnection, writeConnection } from '@libs/database.module';
import { Inject } from '@nestjs/common';
import { IUser, UserProperties } from 'src/user/domain/user';
import { UserFactory } from 'src/user/domain/user.factory';
import { UserEntity } from '../entity/user';
import { UserRepository } from './user.repository';

export class UserRepositoryImplement implements UserRepository {
  @Inject() private readonly userFactory: UserFactory;

  async save(data: IUser | IUser[]): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map((model) => this.modelToEntity(model));
    await writeConnection.manager.getRepository(UserEntity).save(entities);
  }

  async findById(id: number): Promise<{ entity: UserEntity; model: IUser }> | null {
    const entity = await readConnection
      .getRepository(UserEntity)
      .createQueryBuilder('t1')
      .leftJoinAndSelect('t1.refreshTokens', 't2')
      .leftJoinAndSelect('t1.roles', 't3')
      .leftJoinAndSelect('t3.permissions', 't4')
      .where('t1.id = :id', { id })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  async findByUsername(username: string): Promise<{ entity: UserEntity; model: IUser }> | null {
    const entity = await readConnection
      .getRepository(UserEntity)
      .createQueryBuilder('t1')
      .leftJoinAndSelect('t1.refreshTokens', 't2')
      .leftJoinAndSelect('t1.roles', 't3')
      .leftJoinAndSelect('t3.permissions', 't4')
      .where('t1.username = :username', { username })
      .getOne();
    return entity ? { entity: entity, model: this.entityToModel(entity) } : null;
  }

  private modelToEntity(model: IUser): UserEntity {
    const properties = JSON.parse(JSON.stringify(model)) as UserProperties;
    return {
      ...properties,
    };
  }

  private entityToModel(entity: UserEntity): IUser {
    return this.userFactory.reconstitute({
      ...entity,
    });
  }
}
