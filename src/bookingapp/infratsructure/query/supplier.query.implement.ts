import { readConnection } from '@libs/database.module';
import * as _ from 'lodash';
import { FindSupplierByCodesResult } from 'src/bookingapp/application/query/find.supplier.bycodes.result';
import { SupplierEntity } from '../entity/supplier';
import { SupplierQuery } from './supplier.query';

export class SupplierQueryImplement implements SupplierQuery {
  async findByCodes(codes: string[]): Promise<FindSupplierByCodesResult> {
    let sql = readConnection
      .getRepository(SupplierEntity)
      .createQueryBuilder('t1')
      .select('t1.SUPPLIER_CODE', 'supplier_code')
      .addSelect('t1.DELETE_FLAG', 'supplier_status')
      .leftJoin('supplier_contract', 't2', 't1.SUPPLIER_CODE = t2.VN_CODE')
      .addSelect(
        `json_arrayagg(
          json_object(
            "supplier_name", t1.SUPPLIER_NAME_VNM,
            "supplier_email", t1.EMAIL_ADDRESS,
            "supplier_phone", t1.PHONE_NUMBER,
            "branch_code", t2.BRANCH_CODE,
            "tax_code", t2.COMPANY_TAX_REGISTRATION_NO,
            "branch_status", 1
          )
        )`,
        'branch_list',
      );
    if (codes && codes.length > 0) {
      sql = sql.where('t1.SUPPLIER_CODE IN (:...codes)', { codes });
    }
    const data = await sql.groupBy('t1.SUPPLIER_CODE').distinctOn(['t1.SUPPLIER_CODE', 't2.BRANCH_CODE']).getRawMany();
    return {
      items: data.map((i) => {
        return {
          ...i,
          supplier_status: i.supplier_status === 'Y' ? 2 : 1,
          contract_no: '',
          branch_list: _.uniqBy(i.branch_list, 'branch_code'),
        };
      }),
    };
  }
}
