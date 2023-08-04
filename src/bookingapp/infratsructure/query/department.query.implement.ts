import { readConnection } from '@libs/database.module';
import { FindDepartmentByCodesResult } from 'src/bookingapp/application/query/find.department.bycodes.result';
import { DepartmentEntity } from '../entity/department';
import { DepartmentQuery } from './department.query';

export class DepartmentQueryImplement implements DepartmentQuery {
  async findByCodes(codes: string[]): Promise<FindDepartmentByCodesResult> {
    let sql = readConnection.getRepository(DepartmentEntity).createQueryBuilder('t1');
    if (codes && codes.length > 0) {
      sql = sql.where('t1.DEPT_ID IN (:...codes)', { codes });
    }
    const data = await sql.maxExecutionTime(5000).getMany();
    return {
      items: data.map((i) => {
        return {
          line_code: i.LINE_ID,
          department_code: i.DEPT_ID,
          department_name: i.DEPT_NAME,
          department_status: i.DELETED === 'Y' ? 2 : 1,
        };
      }),
    };
  }
}
