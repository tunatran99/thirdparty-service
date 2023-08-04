import { readConnection } from '@libs/database.module';
import { FindPOByCodesResult } from 'src/bookingapp/application/query/find.po.bycodes.result';
import { PurchaseOrderEntity } from '../entity/purchase_order';
import { POQuery } from './po.query';
import moment from 'moment';

export class POQueryImplement implements POQuery {
  async findAllCodes(): Promise<any> {
    let sql = readConnection
      .getRepository(PurchaseOrderEntity)
      .createQueryBuilder('t1')
      .innerJoin('purchase_order_code_temp', 't2', 't1.ORDER_NO = t2.ORDER_NO')
      .select('distinct t1.ORDER_NO', 'purchase_code')
      

      const data = await sql.getRawMany();

      return data;
  }
  async findByCodes(codes: string[]): Promise<FindPOByCodesResult> {
    console.log("Querying...")
    let sql = readConnection
      .getRepository(PurchaseOrderEntity)
      .createQueryBuilder('t1')
      .select('t1.ORDER_NO', 'purchase_code')
      .addSelect('t1.SUPPLIER', 'supplier_code')
      .addSelect('t2.DEPT_ID', 'department_code')
      .addSelect('t1.ETA_DATE', 'purchase_date')
      .addSelect('t1.BRANCH_CODE', 'branch_code')
      .addSelect('t1.CONTRACT_NO', 'contract_no')
      .addSelect('COALESCE(t3.COMPANY_TAX_REGISTRATION_NO, "")', 'tax_code')
      .addSelect(
        `json_arrayagg(
          json_object(
            "sku_code", t1.SKU,
            "unit", t1.UNIT_COST_UOM,
            "purchase_number", t1.ORDER_QTY
          )
        )`,
        'purchase_product',
      )
      .leftJoin('sku', 't2', 't1.SKU = t2.SKU_CODE')
      .leftJoin(
        'supplier_contract',
        't3',
        't1.SUPPLIER = t3.VN_CODE AND t1.CONTRACT_NO = t3.VN_CONTRACT AND t1.BRANCH_CODE = t3.BRANCH_CODE',
      );
    if (codes && codes.length > 0) {
      sql = sql.where('t1.ORDER_NO IN (:...codes)', { codes });
    }
    const data = await sql.groupBy('t1.ORDER_NO').maxExecutionTime(40000).getRawMany();
    return {
      items: data.map((i) => {
        return {
          ...i,
          purchase_date: moment(i.purchase_date, 'YYYYMMDD').format('YYYY-MM-DD'),
          purchase_product: i.purchase_product.map((k) => {
            return {
              ...k,
              purchase_number: Number.parseInt(k.purchase_number),
            };
          }),
        };
      }),
    };
  }

  async findByCodesSchedule(codes: string[]): Promise<FindPOByCodesResult> {
    // console.log("Querying...")
    let sql = readConnection
      .getRepository(PurchaseOrderEntity)
      .createQueryBuilder('t1')
      .select('t1.ORDER_NO', 'purchase_code')
      .addSelect('t1.SUPPLIER', 'supplier_code')
      .addSelect('t2.DEPT_ID', 'department_code')
      .addSelect('t1.ETA_DATE', 'purchase_date')
      .addSelect('t1.BRANCH_CODE', 'branch_code')
      .addSelect('t1.CONTRACT_NO', 'contract_no')
      .addSelect('COALESCE(t3.COMPANY_TAX_REGISTRATION_NO, "")', 'tax_code')
      .addSelect(
        `json_arrayagg(
          json_object(
            "sku_code", t1.SKU,
            "unit", t1.UNIT_COST_UOM,
            "purchase_number", t1.ORDER_QTY
          )
        )`,
        'purchase_product',
      )
      .leftJoin('sku', 't2', 't1.SKU = t2.SKU_CODE')
      .leftJoin(
        'supplier_contract',
        't3',
        't1.SUPPLIER = t3.VN_CODE AND t1.CONTRACT_NO = t3.VN_CONTRACT AND t1.BRANCH_CODE = t3.BRANCH_CODE',
      );
    if (codes && codes.length > 0) {
      sql = sql.where('t1.ORDER_NO IN (:...codes)', { codes });
    }
    const data = await sql.groupBy('t1.ORDER_NO').maxExecutionTime(40000).getRawMany();
    return {
      items: data.map((i) => {
        return {
          ...i,
          purchase_date: moment(i.purchase_date, 'YYYYMMDD').format('YYYY-MM-DD'),
          purchase_product: i.purchase_product.map((k) => {
            return {
              ...k,
              purchase_number: Number.parseInt(k.purchase_number),
            };
          }),
        };
      }),
    };
  }
}
