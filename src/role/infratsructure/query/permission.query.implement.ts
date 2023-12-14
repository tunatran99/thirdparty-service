import { readConnection } from 'libs/database.module';
import { PermissionEntity } from '../entity/permission';
import { PermissionQuery } from './permission.query';

export class PermissionQueryImplement implements PermissionQuery {
  async findAll(): Promise<PermissionEntity[]> {
    return readConnection.getRepository(PermissionEntity).createQueryBuilder('t1').getMany();
  }
}
