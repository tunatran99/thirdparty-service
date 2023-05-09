import { readConnection } from '@libs/database.module';
import { Brackets } from 'typeorm';
import { LogQuery } from './log.query';
import { LogEntity } from '../entity/log';

export class LogQueryImplement implements LogQuery {
  async find(offset = 0, limit = 10, search?: string): Promise<any> {
    let sql = readConnection
      .getRepository(LogEntity)
      .createQueryBuilder('t1')
      .offset(offset)
      .limit(limit)
      .select(
        `
      t1.id as id,
      t1.ip as ip,
      t1.url as url,
      t1.method as method,
      t1.statusCode as statusCode,
      t1.isFailed as isFailed,
      t1.requestHeader as requestHeader,
      t1.requestBody as requestBody,
      t1.responseBody as responseBody,
      t1.createdAt as createdAt,
      t2.name as partnerName
      `,
      )
      .leftJoin('ps_partner', 't2', 't1.partnerId = t2.id')
      .orderBy('t1.createdAt', 'DESC');
    if (search) {
      sql = sql.where(
        new Brackets((qb) => {
          qb.where('t2.name like :search', { search: `%${search}%` });
        }),
      );
    }
    const items = await sql.getRawMany();
    return {
      items,
      total: await sql.getCount(),
    };
  }
}
