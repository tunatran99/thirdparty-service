import { readConnection } from '@libs/database.module';
import { FindLineByCodesResult } from 'src/bookingapp/application/query/find.line.bycodes.result';
import { LineEntity } from '../entity/line';
import { LineQuery } from './line.query';

export class LineQueryImplement implements LineQuery {
  async findByCodes(codes: string[]): Promise<FindLineByCodesResult> {
    let sql = readConnection.getRepository(LineEntity).createQueryBuilder('t1');
    if (codes && codes.length > 0) {
      sql = sql.where('t1.LINE_ID IN (:...codes)', { codes });
    }
    const data = await sql.maxExecutionTime(5000).getMany();
    return {
      items: data.map((i) => {
        return {
          line_code: i.LINE_ID,
          line_name: i.LINE_NAME,
          line_status: i.DELETED === 'Y' ? 2 : 1,
        };
      }),
    };
  }
}
