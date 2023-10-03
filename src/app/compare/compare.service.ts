import { readConnection } from '@libs/database.module';
import { UtilityImplement } from '@libs/utility.module';
import { Inject, Injectable, Logger } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs/promises';
import * as XLSX from 'xlsx';
import * as fsNode from 'fs';
import { PriceEntity } from 'src/sku/infratsructure/entity/price';
import _ from 'lodash';
import { SkuEntity } from 'src/sku/infratsructure/entity/sku';
import { PriceService } from 'src/sku/domain/price.service';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import moment from 'moment';

@Injectable()
export class CompareService {
  private readonly logger = new Logger(CompareService.name);
  @Inject()
  private readonly util: UtilityImplement;

  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  constructor(private readonly priceService: PriceService) { }

  async testFunction(stores: string[]) {
    const skuCodes = []

    for (const [index, store] of stores.entries()) {
      console.log(store)
      console.log("index:", index)

      let wb = new ExcelJS.stream.xlsx.WorkbookReader(`src/app/compare/Merge8.xlsx`, {
        sharedStrings: 'cache',
        hyperlinks: 'cache',
        worksheets: 'emit',
      })
      let rowNumber = 1
      for await (const ws of wb) {
        for await (const row of ws) {
          if (rowNumber > 1 && row.values[1] !== undefined) {
            // console.log(row.values[1])
            if (row.values[1].substring(0, 8).length === 8) {
              skuCodes.push(row.values[1].substring(0, 8));
            }
          }
          rowNumber++;
        }
      }
    }
    console.log(skuCodes.length)
    let result = await readConnection.getRepository(SkuEntity).createQueryBuilder('t1')
    .where('t1.SKU_CODE in (:...skuCodes)', { skuCodes }).getRawMany();

    result = result.map(i => i['t1_SKU_CODE'])

    // console.log(result)

    console.log(skuCodes.filter(k => !result.includes(k)));
    // console.log(skuCodes[0])


    // const { prices } = await this.priceService.calcPrice(skuCodes);
    // console.log(prices.length)

    // this.logger.log("Ghi vào file")
    
    // const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
    //   filename: `src/newsku/9997.xlsx`,
    // });
    // const ws = wb.addWorksheet();
    // ws.addRow([
    //   'sku',
    //   'store',
    //   'line',
    //   'division',
    //   'group',
    //   'dept',
    //   'category',
    //   'status',
    //   'member',
    //   'uomEn',
    //   'uomVn',

    //   'normal price',
    //   'promo price',
    //   'ori promo price',
    //   'start time',
    //   'end time',
    //   'member mark',

    //   'pc no',
    //   'pc status',
    //   'pc trans type',
    //   'pc type',
    //   'pc type value',
    //   'pc price',
    //   'pc start date',
    //   'pc end start',
    //   'pc start time',
    //   'pc end time',

    //   'pc normal',
    //   'pc normal status',
    //   'pc normal trans type',
    //   'pc normal type',
    //   'pc normal type value',
    //   'pc normal price',
    //   'pc normal start date',
    //   'pc normal end date',
    //   'pc normal start time',
    //   'pc normal end time',

    //   'gpc no',
    //   'gpc status',
    //   'gpc trans type',
    //   'gpc type',
    //   'gpc type value',
    //   'gpc price',
    //   'gpc start date',
    //   'gpc end date',
    //   'gpc start time',
    //   'gpc end time',

    //   'price from',
    // ]).commit();
    // for (const psPrice of prices) {
    //   ws.addRow([
    //     psPrice.sku,
    //     psPrice.store,
    //     psPrice.line,
    //     psPrice.division,
    //     psPrice.group,
    //     psPrice.dept,
    //     psPrice.category,
    //     psPrice.status,
    //     psPrice.member,
    //     psPrice.uomEn,
    //     psPrice.uomVn,

    //     psPrice.normalPrice,
    //     psPrice.promoPrice,
    //     psPrice.oriPromoPrice,
    //     psPrice.startTime,
    //     psPrice.endTime,
    //     psPrice.memberMark,

    //     psPrice.pcNo,
    //     psPrice.pcStatus,
    //     psPrice.pcTransType,
    //     psPrice.pcType,
    //     psPrice.pcTypeValue,
    //     psPrice.pcPrice,
    //     psPrice.pcStartDate,
    //     psPrice.pcEndDate,
    //     psPrice.pcStartTime,
    //     psPrice.pcEndTime,

    //     psPrice.pcNormal,
    //     psPrice.pcNormalStatus,
    //     psPrice.pcNormalTransType,
    //     psPrice.pcNormalType,
    //     psPrice.pcNormalTypeValue,
    //     psPrice.pcNormalPrice,
    //     psPrice.pcNormalStartDate,
    //     psPrice.pcNormalEndDate,
    //     psPrice.pcNormalStartTime,
    //     psPrice.pcNormalEndTime,

    //     psPrice.gpcNo,
    //     psPrice.gpcStatus,
    //     psPrice.gpcTransType,
    //     psPrice.gpcType,
    //     psPrice.gpcTypeValue,
    //     psPrice.gpcPrice,
    //     psPrice.gpcStartDate,
    //     psPrice.gpcEndDate,
    //     psPrice.gpcStartTime,
    //     psPrice.gpcEndTime,

    //     psPrice.priceFrom,
    //   ]).commit();
    // }
    // await wb.commit();
  }
  async testReadFunction() {
    const wbs = {},
      wss = {};
    const storeFolders = await fs.readdir(`src/remain/pop`);
    for (const storeFolder of storeFolders) {
      const filesName = await fs.readdir(`src/remain/pop/${storeFolder}`);
      for (const filename of filesName) {
        console.log(`Process file ${storeFolder}/${filename}`);
        let wb = new ExcelJS.stream.xlsx.WorkbookReader(`src/remain/pop/${storeFolder}/${filename}`, {
          sharedStrings: 'cache',
          hyperlinks: 'cache',
          worksheets: 'emit',
        })
        const psPrices = [];
        let rowNumber = 1
        for await (const ws of wb) {
          for await (const row of ws) {
            if (rowNumber > 1) {
              psPrices.push({
                sku: row.values[1],
                store: row.values[2],
                line: row.values[3],
                division: row.values[4],
                group: row.values[5],
                dept: row.values[6],
                category: row.values[7],
                status: row.values[8],
                member: row.values[9],
                uomEn: row.values[10],
                uomVn: row.values[11],
                normalPrice: row.values[12],
                promoPrice: row.values[13],
                oriPromoPrice: row.values[14],
                startTime: row.values[15],
                endTime: row.values[16],
                memberMark: row.values[17],
                pcNo: row.values[18],
                pcStatus: row.values[19],
                pcTransType: row.values[20],
                pcType: row.values[21],
                pcTypeValue: row.values[22],
                pcPrice: row.values[23],
                pcStartDate: row.values[24],
                pcEndDate: row.values[25],
                pcStartTime: row.values[26],
                pcEndTime: row.values[27],
                pcNormal: row.values[28],
                pcNormalStatus: row.values[29],
                pcNormalTransType: row.values[30],
                pcNormalType: row.values[31],
                pcNormalTypeValue: row.values[32],
                pcNormalPrice: row.values[33],
                pcNormalStartDate: row.values[34],
                pcNormalEndDate: row.values[35],
                pcNormalStartTime: row.values[36],
                pcNormalEndTime: row.values[37],
                gpcNo: row.values[38],
                gpcStatus: row.values[39],
                gpcTransType: row.values[40],
                gpcType: row.values[41],
                gpcTypeValue: row.values[42],
                gpcPrice: row.values[43],
                gpcStartDate: row.values[44],
                gpcEndDate: row.values[45],
                gpcStartTime: row.values[46],
                gpcEndTime: row.values[47],
                priceFrom: row.values[48],
              });
            }
            rowNumber++;
          }
        }

        for (const psPrice of psPrices) {
            wbs[0] = new ExcelJS.stream.xlsx.WorkbookWriter({
              filename: `src/remain/pop/${storeFolder}/price.xlsx`,
            });
            wss[0] = wbs[0].addWorksheet();
            wss[0]
              .addRow([
                'sku',
                'store',
                'line',
                'division',
                'group',
                'dept',
                'category',
                'status',
                'member',
                'uomEn',
                'uomVn',
                'normalPrice',
                'promoPrice',
                'oriPromoPrice',
                'startTime',
                'endTime',
                'memberMark',
                'pcNo',
                'pcStatus',
                'pcTransType',
                'pcType',
                'pcTypeValue',
                'pcPrice',
                'pcStartDate',
                'pcEndDate',
                'pcStartTime',
                'pcEndTime',
                'pcNormal',
                'pcNormalStatus',
                'pcNormalTransType',
                'pcNormalType',
                'pcNormalTypeValue',
                'pcNormalPrice',
                'pcNormalStartDate',
                'pcNormalEndDate',
                'pcNormalStartTime',
                'pcNormalEndTime',
                'gpcNo',
                'gpcStatus',
                'gpcTransType',
                'gpcType',
                'gpcTypeValue',
                'gpcPrice',
                'gpcStartDate',
                'gpcEndDate',
                'gpcStartTime',
                'gpcEndTime',
                'priceFrom',
              ])
              .commit();
          wss[0]
            .addRow([
              psPrice.sku,
              psPrice.store,
              psPrice.line,
              psPrice.division,
              psPrice.group,
              psPrice.dept,
              psPrice.category,
              psPrice.status,
              psPrice.member,
              psPrice.uomEn,
              psPrice.uomVn,
              psPrice.normalPrice,
              psPrice.promoPrice,
              psPrice.oriPromoPrice,
              psPrice.startTime,
              psPrice.endTime,
              psPrice.memberMark,
              psPrice.pcNo,
              psPrice.pcStatus,
              psPrice.pcTransType,
              psPrice.pcType,
              psPrice.pcTypeValue,
              psPrice.pcPrice,
              psPrice.pcStartDate,
              psPrice.pcEndDate,
              psPrice.pcStartTime,
              psPrice.pcEndTime,
              psPrice.pcNormal,
              psPrice.pcNormalStatus,
              psPrice.pcNormalTransType,
              psPrice.pcNormalType,
              psPrice.pcNormalTypeValue,
              psPrice.pcNormalPrice,
              psPrice.pcNormalStartDate,
              psPrice.pcNormalEndDate,
              psPrice.pcNormalStartTime,
              psPrice.pcNormalEndTime,
              psPrice.gpcNo,
              psPrice.gpcStatus,
              psPrice.gpcTransType,
              psPrice.gpcType,
              psPrice.gpcTypeValue,
              psPrice.gpcPrice,
              psPrice.gpcStartDate,
              psPrice.gpcEndDate,
              psPrice.gpcStartTime,
              psPrice.gpcEndTime,
              psPrice.priceFrom,
            ])
            .commit();
        }
      }
    }
    for (const key of Object.keys(wbs)) {
      await wbs[key].commit();
    }
  }

  // async getSkus() {
  //   this.logger.log("Lấy tất cả skus");
  //   try {
  //     let skusRaw = await readConnection
  //     .getRepository(SkuEntity)
  //     .createQueryBuilder('t1')
  //     .select('t1.SKU_CODE', 'sku')
  //     .maxExecutionTime(1000)
  //     .getRawMany();

  //   return skusRaw;
  //   }
  //   catch (e) {
  //     this.logger.error("Query timeout!! Restarting. . .")
  //   }
  // }

  async getRemainSkus() {
    // const { skus, psSkus } = await this.getSkus();
    this.logger.log("Lọc các sku chưa insert vào ps_price")
    let remainSkusRaw = /*skus.filter(sku => !psSkus.includes(sku))*/ await readConnection
      .getRepository(SkuEntity)
      .createQueryBuilder('t1')
      .select('t1.SKU_CODE', 'sku')
      .where("NOT EXISTS (SELECT sku FROM ps_price WHERE t1.SKU_CODE = ps_price.sku)")
      .getRawMany();

    let remainSkus = remainSkusRaw.map(remain => remain.sku)
    console.log(remainSkus.length)
    const { prices } = await this.priceService.calcPrice(remainSkus);
    console.log(prices.length)

    const wbs = {},
      wss = {};

    this.logger.log("Ghi vào file")
    for (const price of prices) {
      if (!wbs[price.dept]) {
        wbs[price.dept] = new ExcelJS.stream.xlsx.WorkbookWriter({
          filename: `src/remain/${price.dept}.xlsx`,
        });
        wss[price.dept] = wbs[price.dept].addWorksheet();
        wss[price.dept]
          .addRow([
            'sku',
            'store',
            'line',
            'division',
            'group',
            'dept',
            'category',
            'status',
            'member',
            'uomEn',
            'uomVn',
            'normalPrice',
            'promoPrice',
            'oriPromoPrice',
            'startTime',
            'endTime',
            'memberMark',
            'pcNo',
            'pcStatus',
            'pcTransType',
            'pcType',
            'pcTypeValue',
            'pcPrice',
            'pcStartDate',
            'pcEndDate',
            'pcStartTime',
            'pcEndTime',
            'pcNormal',
            'pcNormalStatus',
            'pcNormalTransType',
            'pcNormalType',
            'pcNormalTypeValue',
            'pcNormalPrice',
            'pcNormalStartDate',
            'pcNormalEndDate',
            'pcNormalStartTime',
            'pcNormalEndTime',
            'gpcNo',
            'gpcStatus',
            'gpcTransType',
            'gpcType',
            'gpcTypeValue',
            'gpcPrice',
            'gpcStartDate',
            'gpcEndDate',
            'gpcStartTime',
            'gpcEndTime',
            'priceFrom',
          ])
          .commit();
      }
      wss[price.dept]
        .addRow([
          price.sku,
          price.store,
          price.line,
          price.division,
          price.group,
          price.dept,
          price.category,
          price.status,
          price.member,
          price.uomEn,
          price.uomVn,
          price.normalPrice,
          price.promoPrice,
          price.oriPromoPrice,
          price.startTime,
          price.endTime,
          price.memberMark,
          price.pcNo,
          price.pcStatus,
          price.pcTransType,
          price.pcType,
          price.pcTypeValue,
          price.pcPrice,
          price.pcStartDate,
          price.pcEndDate,
          price.pcStartTime,
          price.pcEndTime,
          price.pcNormal,
          price.pcNormalStatus,
          price.pcNormalTransType,
          price.pcNormalType,
          price.pcNormalTypeValue,
          price.pcNormalPrice,
          price.pcNormalStartDate,
          price.pcNormalEndDate,
          price.pcNormalStartTime,
          price.pcNormalEndTime,
          price.gpcNo,
          price.gpcStatus,
          price.gpcTransType,
          price.gpcType,
          price.gpcTypeValue,
          price.gpcPrice,
          price.gpcStartDate,
          price.gpcEndDate,
          price.gpcStartTime,
          price.gpcEndTime,
          price.priceFrom,
        ])
        .commit();
    }

    for (const key of Object.keys(wbs)) {
      await wbs[key].commit();
    }
  }

  async xlsToXlsx() {
    const storeFolders = await fs.readdir(`src/pfprices/xls`);
    for (const storeFolder of storeFolders) {
      console.log(storeFolder)
      const filesName = await fs.readdir(`src/pfprices/xls/${storeFolder}`);
      await fs.mkdir(`src/pfprices/xlsx/${storeFolder}`, { recursive: true });
      for (const fileName of filesName) {
        console.log(`Process file ${storeFolder}/${fileName}`);
        const wb = XLSX.readFile(`src/pfprices/xls/${storeFolder}/${fileName}`);
        XLSX.writeFileXLSX(wb, `src/pfprices/xlsx/${storeFolder}/${fileName}x`);
      }
    }
    return null;
  }

  async mergePFPrices() {
    const wbs = {},
      wss = {};
    const storeFolders = await fs.readdir(`src/pfprices/xlsx`);
    for (const storeFolder of storeFolders) {
      const filesName = await fs.readdir(`src/pfprices/xlsx/${storeFolder}`);
      for (const filename of filesName) {
        console.log(`Process file ${storeFolder}/${filename}`);
        let wb = new ExcelJS.Workbook();
        wb = await wb.xlsx.readFile(`src/pfprices/xlsx/${storeFolder}/${filename}`);
        const pfPrices = [];
        wb.eachSheet((ws) => {
          ws.eachRow((row, rowNumber) => {
            if (rowNumber > 5) {
              pfPrices.push({
                store: row.values[1],
                line: row.values[2],
                division: row.values[3],
                group: row.values[4],
                dept: row.values[5],
                sku: row.values[6],
                normalPrice: row.values[15],
                promoPrice: row.values[16],
                memberPrice: row.values[17],
                groupPrice: row.values[18],
              });
            }
          });
        });
        for (const pfPrice of pfPrices) {
          if (!wbs[pfPrice.dept]) {
            wbs[pfPrice.dept] = new ExcelJS.stream.xlsx.WorkbookWriter({
              filename: `src/pfprices/dept/${pfPrice.dept}.xlsx`,
            });
            wss[pfPrice.dept] = wbs[pfPrice.dept].addWorksheet();
            wss[pfPrice.dept]
              .addRow([
                'store',
                'line',
                'division',
                'group',
                'dept',
                'sku',
                'normal price',
                'promo price',
                'member price',
                'group price',
              ])
              .commit();
          }
          wss[pfPrice.dept]
            .addRow([
              pfPrice.store,
              pfPrice.line,
              pfPrice.division,
              pfPrice.group,
              pfPrice.dept,
              pfPrice.sku,
              pfPrice.normalPrice,
              pfPrice.promoPrice,
              pfPrice.memberPrice,
              pfPrice.groupPrice,
            ])
            .commit();
        }
      }
    }
    for (const key of Object.keys(wbs)) {
      await wbs[key].commit();
    }
  }

  async mergePSPrices() {
    const wbs = {},
      wss = {};
    const filesName = await fs.readdir(`src/ps_xlsx`);
    for (const filename of filesName) {
      console.log(`Process file ${filename}`);
      const psPrices = [];
      // let wb = new ExcelJS.Workbook();
      // let stream = fsNode.createReadStream(`src/ps_xlsx/${filename}`);
      // wb = await wb.xlsx.readFile(`src/ps_xlsx/${filename}`);
      let wb = new ExcelJS.stream.xlsx.WorkbookReader(`src/ps_xlsx/${filename}`, {
        sharedStrings: 'cache',
        hyperlinks: 'cache',
        worksheets: 'emit',
      })
      let rowNumber = 1
      for await (const ws of wb) {
        for await (const row of ws) {
          if (rowNumber > 5) {
            psPrices.push({
              sku: row.values[1],
              store: row.values[2],
              line: row.values[3],
              division: row.values[4],
              group: row.values[5],
              dept: row.values[6],
              category: row.values[7],
              status: row.values[8],
              member: row.values[9],
              uomEn: row.values[10],
              uomVn: row.values[11],
              normalPrice: row.values[12],
              promoPrice: row.values[13],
              oriPromoPrice: row.values[14],
              startTime: row.values[15],
              endTime: row.values[16],
              memberMark: row.values[17],
              pcNo: row.values[18],
              pcStatus: row.values[19],
              pcTransType: row.values[20],
              pcType: row.values[21],
              pcTypeValue: row.values[22],
              pcPrice: row.values[23],
              pcStartDate: row.values[24],
              pcEndDate: row.values[25],
              pcStartTime: row.values[26],
              pcEndTime: row.values[27],
              pcNormal: row.values[28],
              pcNormalStatus: row.values[29],
              pcNormalTransType: row.values[30],
              pcNormalType: row.values[31],
              pcNormalTypeValue: row.values[32],
              pcNormalPrice: row.values[33],
              pcNormalStartDate: row.values[34],
              pcNormalEndDate: row.values[35],
              pcNormalStartTime: row.values[36],
              pcNormalEndTime: row.values[37],
              gpcNo: row.values[38],
              gpcStatus: row.values[39],
              gpcTransType: row.values[40],
              gpcType: row.values[41],
              gpcTypeValue: row.values[42],
              gpcPrice: row.values[43],
              gpcStartDate: row.values[44],
              gpcEndDate: row.values[45],
              gpcStartTime: row.values[46],
              gpcEndTime: row.values[47],
              priceFrom: row.values[48],
            });
          }
          rowNumber++;
        }
      }

      // wb = await wb.xlsx.read(stream)
      // wb.eachSheet((ws) => {
      //   ws.eachRow((row, rowNumber) => {
      //     if (rowNumber > 5) {
      //       psPrices.push({
      //         sku: row.values[1],
      //         store: row.values[2],
      //         line: row.values[3],
      //         division: row.values[4],
      //         group: row.values[5],
      //         dept: row.values[6],
      //         category: row.values[7],
      //         status: row.values[8],
      //         member: row.values[9],
      //         uomEn: row.values[10],
      //         uomVn: row.values[11],
      //         normalPrice: row.values[12],
      //         promoPrice: row.values[13],
      //         oriPromoPrice: row.values[14],
      //         startTime: row.values[15],
      //         endTime: row.values[16],
      //         memberMark: row.values[17],
      //         pcNo: row.values[18],
      //         pcStatus: row.values[19],
      //         pcTransType: row.values[20],
      //         pcType: row.values[21],
      //         pcTypeValue: row.values[22],
      //         pcPrice: row.values[23],
      //         pcStartDate: row.values[24],
      //         pcEndDate: row.values[25],
      //         pcStartTime: row.values[26],
      //         pcEndTime: row.values[27],
      //         pcNormal: row.values[28],
      //         pcNormalStatus: row.values[29],
      //         pcNormalTransType: row.values[30],
      //         pcNormalType: row.values[31],
      //         pcNormalTypeValue: row.values[32],
      //         pcNormalPrice: row.values[33],
      //         pcNormalStartDate: row.values[34],
      //         pcNormalEndDate: row.values[35],
      //         pcNormalStartTime: row.values[36],
      //         pcNormalEndTime: row.values[37],
      //         gpcNo: row.values[38],
      //         gpcStatus: row.values[39],
      //         gpcTransType: row.values[40],
      //         gpcType: row.values[41],
      //         gpcTypeValue: row.values[42],
      //         gpcPrice: row.values[43],
      //         gpcStartDate: row.values[44],
      //         gpcEndDate: row.values[45],
      //         gpcStartTime: row.values[46],
      //         gpcEndTime: row.values[47],
      //         priceFrom: row.values[48],
      //       });
      //     }
      //   });
      // });
      for (const psPrice of psPrices) {
        if (!wbs[psPrice.dept]) {
          wbs[psPrice.dept] = new ExcelJS.stream.xlsx.WorkbookWriter({
            filename: `src/psprices/${psPrice.dept}.xlsx`,
          });
          wss[psPrice.dept] = wbs[psPrice.dept].addWorksheet();
          wss[psPrice.dept]
            .addRow([
              'sku',
              'store',
              'line',
              'division',
              'group',
              'dept',
              'category',
              'status',
              'member',
              'uomEn',
              'uomVn',
              'normalPrice',
              'promoPrice',
              'oriPromoPrice',
              'startTime',
              'endTime',
              'memberMark',
              'pcNo',
              'pcStatus',
              'pcTransType',
              'pcType',
              'pcTypeValue',
              'pcPrice',
              'pcStartDate',
              'pcEndDate',
              'pcStartTime',
              'pcEndTime',
              'pcNormal',
              'pcNormalStatus',
              'pcNormalTransType',
              'pcNormalType',
              'pcNormalTypeValue',
              'pcNormalPrice',
              'pcNormalStartDate',
              'pcNormalEndDate',
              'pcNormalStartTime',
              'pcNormalEndTime',
              'gpcNo',
              'gpcStatus',
              'gpcTransType',
              'gpcType',
              'gpcTypeValue',
              'gpcPrice',
              'gpcStartDate',
              'gpcEndDate',
              'gpcStartTime',
              'gpcEndTime',
              'priceFrom',
            ])
            .commit();
        }
        wss[psPrice.dept]
          .addRow([
            psPrice.sku,
            psPrice.store,
            psPrice.line,
            psPrice.division,
            psPrice.group,
            psPrice.dept,
            psPrice.category,
            psPrice.status,
            psPrice.member,
            psPrice.uomEn,
            psPrice.uomVn,
            psPrice.normalPrice,
            psPrice.promoPrice,
            psPrice.oriPromoPrice,
            psPrice.startTime,
            psPrice.endTime,
            psPrice.memberMark,
            psPrice.pcNo,
            psPrice.pcStatus,
            psPrice.pcTransType,
            psPrice.pcType,
            psPrice.pcTypeValue,
            psPrice.pcPrice,
            psPrice.pcStartDate,
            psPrice.pcEndDate,
            psPrice.pcStartTime,
            psPrice.pcEndTime,
            psPrice.pcNormal,
            psPrice.pcNormalStatus,
            psPrice.pcNormalTransType,
            psPrice.pcNormalType,
            psPrice.pcNormalTypeValue,
            psPrice.pcNormalPrice,
            psPrice.pcNormalStartDate,
            psPrice.pcNormalEndDate,
            psPrice.pcNormalStartTime,
            psPrice.pcNormalEndTime,
            psPrice.gpcNo,
            psPrice.gpcStatus,
            psPrice.gpcTransType,
            psPrice.gpcType,
            psPrice.gpcTypeValue,
            psPrice.gpcPrice,
            psPrice.gpcStartDate,
            psPrice.gpcEndDate,
            psPrice.gpcStartTime,
            psPrice.gpcEndTime,
            psPrice.priceFrom,
          ])
          .commit();
      }
    }
    for (const key of Object.keys(wbs)) {
      await wbs[key].commit();
    }
  }

  async splitPfPrices() {
    const columns = [
      { key: 'sku', header: 'sku' },
      { key: 'store', header: 'store' },
      { key: 'line', header: 'line' },
      { key: 'division', header: 'division' },
      { key: 'group', header: 'group' },
      { key: 'dept', header: 'dept' },
      { key: 'category', header: 'category' },
      { key: 'status', header: 'status' },
      { key: 'member', header: 'member' },
      { key: 'uomEn', header: 'uomEn' },
      { key: 'uomVn', header: 'uomVn' },
      { key: 'normal price', header: 'normalPrice' },
      { key: 'promo price', header: 'promoPrice' },
      { key: 'ori promo price', header: 'oriPromoPrice' },
      { key: 'start time', header: 'startTime' },
      { key: 'end time', header: 'endTime' },
      { key: 'member mark', header: 'memberMark' },
      { key: 'pc no', header: 'pcNo' },
      { key: 'pc status', header: 'pcStatus' },
      { key: 'pc trans type', header: 'pcTransType' },
      { key: 'pc type', header: 'pcType' },
      { key: 'pc type value', header: 'pcTypeValue' },
      { key: 'pc price', header: 'pcPrice' },
      { key: 'pc start date', header: 'pcStartDate' },
      { key: 'pc end date', header: 'pcEndDate' },
      { key: 'pc start time', header: 'pcStartTime' },
      { key: 'pc end time', header: 'pcEndTime' },
      { key: 'pc normal', header: 'pc' },
      { key: 'pc normal status', header: 'pcEndTime' },
      { key: 'member price', header: 'memberPrice' },
      { key: 'group price', header: 'groupPrice' },
    ];
    const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(`src/pfprices/Item_Sell_Price_Full.xlsx`, {});
    for await (const worksheetReader of workbookReader) {
      const ws = worksheetReader as unknown as ExcelJS.Worksheet;
      await fs.mkdir(`src/pfprices/${ws.name}`, { recursive: true });
      const storeData = {};
      let index = 0;
      for await (const row of worksheetReader) {
        if (index < 3) {
          index++;
          continue;
        }
        const pfPrice = {
          store: row.values[1],
          line: row.values[2],
          division: row.values[3],
          group: row.values[4],
          dept: row.values[5],
          sku: row.values[6],
          normalPrice: row.values[15],
          promoPrice: row.values[16],
          memberPrice: row.values[17],
          groupPrice: row.values[18],
        };
        if (storeData[pfPrice.dept]) {
          storeData[pfPrice.dept] = [...storeData[pfPrice.dept], pfPrice];
        } else {
          storeData[pfPrice.dept] = [pfPrice];
        }
      }
      for (const [dept, data] of Object.entries<[string, any[]][]>(storeData)) {
        this.logger.log(`Writing store: ${ws.name} / dept: ${dept}`);
        await this.util.writeExcelFile(columns, data, `src/pfprices/${dept}.xlsx`);
      }
    }
  }

  async concatFileName() {
    let output = [];
    const filesName = await fs.readdir(`src/pfprices/dept`);
    for (const filename of filesName) {
      output.push(filename.split('.')[0])
    }
    return output
  }

  async comparePrices(onlyDepts?: string[]) {
    const wbMissDept = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: `src/pfprices/report/missingInPS.xlsx`,
    });
    const wsMissDept = wbMissDept.addWorksheet();
    wsMissDept
      .addRow([
        'store',
        'line',
        'division',
        'group',
        'dept',
        'sku',
        'normal price',
        'promo price',
        'member price',
        'group price',
        'message',
      ])
      .commit();
    const wbs = {},
      wss = {};
    const filesName = await fs.readdir(`src/pfprices/dept`);
    for (const [index, fileName] of filesName.entries()) {
      if (onlyDepts && onlyDepts.length > 0) {
        if (!onlyDepts.includes(fileName.split('.')[0])) continue;
      }
      console.log(`Process dept ${index + 1}: ${fileName}`);
      const pfPrices = [];
      const wbPF = new ExcelJS.stream.xlsx.WorkbookReader(`src/pfprices/dept/${fileName}`, {});
      for await (const worksheetReader of wbPF) {
        for await (const row of worksheetReader) {
          if (row.number > 1) {
            pfPrices.push({
              store: row.values[1],
              line: row.values[2],
              division: row.values[3],
              group: row.values[4],
              dept: row.values[5],
              sku: row.values[6],
              normalPrice: row.values[7],
              promoPrice: row.values[8],
              memberPrice: row.values[9],
              groupPrice: row.values[10],
            });
          }
        }
      }
      try {
        await fs.access(`src/psprices/1001/${fileName}`);
        const wbPS = new ExcelJS.stream.xlsx.WorkbookReader(`src/psprices/1001/${fileName}`, {});
        const psPrices = [] as PriceEntity[];
        for await (const worksheetReader of wbPS) {
          for await (const row of worksheetReader) {
            if (row.number > 1) {
              psPrices.push(
                readConnection.getRepository(PriceEntity).create({
                  sku: row.values[1],
                  store: row.values[2],
                  line: row.values[3],
                  division: row.values[4],
                  group: row.values[5],
                  dept: row.values[6],
                  category: row.values[7],
                  status: row.values[8],
                  member: row.values[9],
                  uomEn: row.values[10],
                  uomVn: row.values[11],
                  normalPrice: row.values[12],
                  promoPrice: row.values[13],
                  oriPromoPrice: row.values[14],
                  startTime: row.values[15],
                  endTime: row.values[16],
                  memberMark: row.values[17],
                  pcNo: row.values[18],
                  pcStatus: row.values[19],
                  pcTransType: row.values[20],
                  pcType: row.values[21],
                  pcTypeValue: row.values[22],
                  pcPrice: row.values[23],
                  pcStartDate: row.values[24],
                  pcEndDate: row.values[25],
                  pcStartTime: row.values[26],
                  pcEndTime: row.values[27],
                  pcNormal: row.values[28],
                  pcNormalStatus: row.values[29],
                  pcNormalTransType: row.values[30],
                  pcNormalType: row.values[31],
                  pcNormalTypeValue: row.values[32],
                  pcNormalPrice: row.values[33],
                  pcNormalStartDate: row.values[34],
                  pcNormalEndDate: row.values[35],
                  pcNormalStartTime: row.values[36],
                  pcNormalEndTime: row.values[37],
                  gpcNo: row.values[38],
                  gpcStatus: row.values[39],
                  gpcTransType: row.values[40],
                  gpcType: row.values[41],
                  gpcTypeValue: row.values[42],
                  gpcPrice: row.values[43],
                  gpcStartDate: row.values[44],
                  gpcEndDate: row.values[45],
                  gpcStartTime: row.values[46],
                  gpcEndTime: row.values[47],
                  priceFrom: row.values[48],
                }),
              );
            }
          }
        }
        // let count = 0;
        for (const pfPrice of pfPrices) {
          if (!wbs[pfPrice.store]) {
            wbs[pfPrice.store] = new ExcelJS.stream.xlsx.WorkbookWriter({
              filename: `src/pfprices/report/${pfPrice.store}.xlsx`,
            });
            wss[pfPrice.store] = wbs[pfPrice.store].addWorksheet();
            wss[pfPrice.store]
              .addRow([
                'store',
                'line',
                'division',
                'group',
                'dept',
                'sku',
                'normal price',
                'promo price',
                'member price',
                'group price',
                'ps normal price',
                'ps promo price',
                'ps PC normal NO',
                'ps PC NO',
                'normal diff',
                'promo diff',
              ])
              .commit();
          }
          let p = pfPrice;
          let hasPrice = false;
          let matchSku = false;
          let matchStore = false;
          // let samePrice = false;
          for (const psPrice of psPrices) {
            if (pfPrice.sku == psPrice.sku) {
              matchSku = true;
              if (pfPrice.store == psPrice.store) {
                matchStore = true;
                const isNormalNaN = Number.isNaN(Number.parseFloat(psPrice.normalPrice));
                const isPromoNaN = Number.isNaN(Number.parseFloat(psPrice.promoPrice));
                const isOriPromoNaN = Number.isNaN(Number.parseFloat(psPrice.oriPromoPrice));
                // samePrice = pfPrice.normalPrice === psPrice.normalPrice
                if (psPrice.normalPrice !== null && psPrice.normalPrice !== undefined && !isNormalNaN) {
                  hasPrice = true;
                  const psNormal =
                    psPrice.normalPrice && !isNormalNaN
                      ? Math.round(Number.parseFloat(psPrice.normalPrice))
                      : psPrice.normalPrice;
                  let psPromo;
                  let psMemberPrice;
                  if (psPrice.memberMark) {
                    psPromo =
                      psPrice.oriPromoPrice && !isOriPromoNaN
                        ? Math.round(Number.parseFloat(psPrice.oriPromoPrice))
                        : psPrice.oriPromoPrice;
                    psMemberPrice =
                      psPrice.promoPrice && !isPromoNaN
                        ? Math.round(Number.parseFloat(psPrice.promoPrice))
                        : psPrice.promoPrice;
                  } else {
                    psPromo =
                      psPrice.promoPrice && !isPromoNaN
                        ? Math.round(Number.parseFloat(psPrice.promoPrice))
                        : psPrice.promoPrice;
                  }
                  const normalDiff = pfPrice.normalPrice != psNormal;
                  let promoDiff = false;
                  if (psPromo) {
                    if (psPromo != pfPrice.promoPrice) promoDiff = true;
                  } else {
                    if (pfPrice.promoPrice != 0) promoDiff = true;
                  }
                  let memberDiff = false;
                  if (psMemberPrice != pfPrice.memberPrice) memberDiff = true;
                  p = {
                    ...pfPrice,
                    psNormalPrice: psNormal,
                    psPromoPrice: psPromo,
                    psPcNormal: psPrice.pcNormal,
                    psPcNo: psPrice.pcNo,
                    normalDiff: normalDiff ? 1 : 0,
                    promoDiff: promoDiff ? 1 : 0,
                  };
                  break;
                }
              }
            }
          }
          let shouldCommit = false;
          if (!hasPrice) {
            // count += 1
            let message = 'Không tìm thấy SKU - khả năng chưa được tính giá';
            if (matchSku) {
              // count += 1
              message = 'Tìm thấy SKU nhưng ko tìm thấy STORE có giá - khả năng thiếu PC và ISP';
              if (matchStore) {
                // count += 1
                message =
                  'Tìm thấy SKU - STORE nhưng ko áp dụng được giá - khả năng PC chưa đến hạn áp dụng và thiếu ISP';
              }
            }
            wsMissDept
              .addRow([
                p.store,
                p.line,
                p.division,
                p.group,
                p.dept,
                p.sku,
                p.normalPrice,
                p.promoPrice,
                p.memberPrice,
                p.groupPrice,
                message,
              ])
              .commit();
          }
          else {
            if (matchSku) {
              // count += 1
  
              if (!matchStore) {
                // count += 1
                let anotherMessage = 'Tìm thấy SKU nhưng ko tìm thấy STORE có giá - khả năng thiếu PC và ISP';
  
                wsMissDept
                  .addRow([
                    p.store,
                    p.line,
                    p.division,
                    p.group,
                    p.dept,
                    p.sku,
                    p.normalPrice,
                    p.promoPrice,
                    p.memberPrice,
                    p.groupPrice,
                    anotherMessage,
                  ])
                  .commit();
              }
              // else {
                // if (samePrice) {
                //   let anotherMessage = 'Tìm thấy SKU - STORE nhưng sai giá';
  
                //   wsMissDept
                //     .addRow([
                //       p.store,
                //       p.line,
                //       p.division,
                //       p.group,
                //       p.dept,
                //       p.sku,
                //       p.normalPrice,
                //       p.promoPrice,
                //       p.memberPrice,
                //       p.groupPrice,
                //       anotherMessage,
                //     ])
                //     .commit();
                // }
              // }
            }
            if (p.psNormalPrice === null || p.psNormalPrice === undefined) {
              if (p.psPromoPrice === null || p.psPromoPrice === undefined) {
                // count += 1
                wsMissDept
                  .addRow([
                    p.store,
                    p.line,
                    p.division,
                    p.group,
                    p.dept,
                    p.sku,
                    p.normalPrice,
                    p.promoPrice,
                    p.memberPrice,
                    p.groupPrice,
                    `Không tìm thấy giá (cả normal và promo) của sku-store`,
                  ])
                  .commit();
              }
            } else {
              if (!p.promoPrice && p.normalDiff == 1) {
                shouldCommit = true;
              }
              if (p.promoPrice && (p.normalDiff == 1 || p.promoDiff == 1)) {
                shouldCommit = true;
              }
            }
          }
          if (shouldCommit) {
            wss[pfPrice.store]
              .addRow([
                p.store,
                p.line,
                p.division,
                p.group,
                p.dept,
                p.sku,
                p.normalPrice,
                p.promoPrice,
                p.memberPrice,
                p.groupPrice,
                p.psNormalPrice,
                p.psPromoPrice,
                p.psPcNormal,
                p.psPcNo,
                p.normalDiff,
                p.promoDiff,
              ])
              .commit();
          }
        }
        // console.log(count)
      } catch (error) {
        for (const p of pfPrices) {
          wsMissDept
            .addRow([
              p.store,
              p.line,
              p.division,
              p.group,
              p.dept,
              p.sku,
              p.normalPrice,
              p.promoPrice,
              p.memberPrice,
              p.groupPrice,
              `Không tìm thấy dept này trên PS`,
            ])
            .commit();
        }
      }
    }
    for (const key of Object.keys(wbs)) {
      await wbs[key].commit();
    }
    await wbMissDept.commit();
  }

  async exportPsPricesTable(onlyStores?: string[]) {
    const columns = [
      { key: 'sku', header: 'sku' },
      { key: 'store', header: 'store' },
      { key: 'line', header: 'line' },
      { key: 'division', header: 'division' },
      { key: 'group', header: 'group' },
      { key: 'dept', header: 'dept' },
      { key: 'category', header: 'category' },
      { key: 'status', header: 'status' },
      { key: 'member', header: 'member' },
      { key: 'uomEn', header: 'uomEn' },
      { key: 'uomVn', header: 'uomVn' },
      { key: 'normalPrice', header: 'normalPrice' },
      { key: 'promoPrice', header: 'promoPrice' },
      { key: 'oriPromoPrice', header: 'oriPromoPrice' },
      { key: 'startTime', header: 'startTime' },
      { key: 'endTime', header: 'endTime' },
      { key: 'memberMark', header: 'memberMark' },
      { key: 'pcNo', header: 'pcNo' },
      { key: 'pcStatus', header: 'pcStatus' },
      { key: 'pcTransType', header: 'pcTransType' },
      { key: 'pcType', header: 'pcType' },
      { key: 'pcTypeValue', header: 'pcTypeValue' },
      { key: 'pcPrice', header: 'pcPrice' },
      { key: 'pcStartDate', header: 'pcStartDate' },
      { key: 'pcEndDate', header: 'pcEndDate' },
      { key: 'pcStartTime', header: 'pcStartTime' },
      { key: 'pcEndTime', header: 'pcEndTime' },
      { key: 'pcNormal', header: 'pcNormal' },
      { key: 'pcNormalStatus', header: 'pcNormalStatus' },
      { key: 'pcNormalTransType', header: 'pcNormalTransType' },
      { key: 'pcNormalType', header: 'pcNormalType' },
      { key: 'pcNormalTypeValue', header: 'pcNormalTypeValue' },
      { key: 'pcNormalPrice', header: 'pcNormalPrice' },
      { key: 'pcNormalStartDate', header: 'pcNormalStartDate' },
      { key: 'pcNormalEndDate', header: 'pcNormalEndDate' },
      { key: 'pcNormalStartTime', header: 'pcNormalStartTime' },
      { key: 'pcNormalEndTime', header: 'pcNormalEndTime' },
      { key: 'gpcNo', header: 'gpcNo' },
      { key: 'gpcStatus', header: 'gpcStatus' },
      { key: 'gpcTransType', header: 'gpcTransType' },
      { key: 'gpcType', header: 'gpcType' },
      { key: 'gpcTypeValue', header: 'gpcTypeValue' },
      { key: 'gpcPrice', header: 'gpcPrice' },
      { key: 'gpcStartDate', header: 'gpcStartDate' },
      { key: 'gpcEndDate', header: 'gpcEndDate' },
      { key: 'gpcStartTime', header: 'gpcStartTime' },
      { key: 'gpcEndTime', header: 'gpcEndTime' },
      { key: 'priceFrom', header: 'priceFrom' },
      { key: 'createdDate', header: 'createdDate' },
      { key: 'lastUpdate', header: 'lastUpdate' },
    ];
    console.log("Query dữ liệu")
    const sql = await readConnection
      .getRepository(PriceEntity)
      .createQueryBuilder('t1')
      .where('t1.store IN (:...store)', { store: onlyStores })
      .andWhere("t1.line IN ('1', '2', '3', '4', '7', '8', '9')")
      .andWhere("t1.division IN ('11', '12', '13', '14', '15', '16', '17', '21', '22', '23', '24', '25', '26', '27', '31', '32', '33', '34', '35', '36', '37', '38', '41', '71', '72', '73', '81', '82', '83', '91', '92', '93')")
      .getMany();
    for (const store of onlyStores) {
      console.log(store)
      await fs.mkdir(`src/psprices/${store}`, { recursive: true });
      const storeData = sql.filter((p) => p.store === store);
      for (const dept of _.uniq(storeData.map((i) => i.dept))) {
        const data = sql.filter((k) => k.dept === dept);
        this.logger.log(`Writing store: ${store} / dept: ${dept}`);
        await this.util.writeExcelFile(columns, data, `src/psprices/${store}/${dept}.xlsx`);
      }
    }
  }

  async exportAllPsPrices(onlyDepts?: string[]) {
    let skusSql = readConnection.getRepository(SkuEntity).createQueryBuilder('t1');
    if (onlyDepts && onlyDepts.length > 0) {
      skusSql = skusSql.where('t1.DEPT_ID IN (:...onlyDepts)', { onlyDepts });
    }
    console.log("Part: Lấy records sku")
    const skus = await skusSql.getMany();
    const uniqDepts = _.uniq(skus.map((i) => i.DEPT_ID));
    console.log("Part: Tính lại giá")
    for (const dept of uniqDepts) {
      console.log(dept)
      const deptSkus = skus.filter((i) => i.DEPT_ID === dept);
      const { prices, errors } = await this.priceService.calcPrice(deptSkus.map((i) => i.SKU_CODE));
      // await this.priceServiceRepo.savePrices(prices)
      const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
        filename: `src/remain/${dept}.xlsx`,
      });
      const ws = wb.addWorksheet();
      ws.addRow([
        'sku',
        'store',
        'line',
        'division',
        'group',
        'dept',
        'category',
        'status',
        'member',
        'uomEn',
        'uomVn',

        'normal price',
        'promo price',
        'ori promo price',
        'start time',
        'end time',
        'member mark',

        'pc no',
        'pc status',
        'pc trans type',
        'pc type',
        'pc type value',
        'pc price',
        'pc start date',
        'pc end start',
        'pc start time',
        'pc end time',

        'pc normal',
        'pc normal status',
        'pc normal trans type',
        'pc normal type',
        'pc normal type value',
        'pc normal price',
        'pc normal start date',
        'pc normal end date',
        'pc normal start time',
        'pc normal end time',

        'gpc no',
        'gpc status',
        'gpc trans type',
        'gpc type',
        'gpc type value',
        'gpc price',
        'gpc start date',
        'gpc end date',
        'gpc start time',
        'gpc end time',

        'price from',
      ]).commit();
      for (const psPrice of prices) {
        ws.addRow([
          psPrice.sku,
          psPrice.store,
          psPrice.line,
          psPrice.division,
          psPrice.group,
          psPrice.dept,
          psPrice.category,
          psPrice.status,
          psPrice.member,
          psPrice.uomEn,
          psPrice.uomVn,

          psPrice.normalPrice,
          psPrice.promoPrice,
          psPrice.oriPromoPrice,
          psPrice.startTime,
          psPrice.endTime,
          psPrice.memberMark,

          psPrice.pcNo,
          psPrice.pcStatus,
          psPrice.pcTransType,
          psPrice.pcType,
          psPrice.pcTypeValue,
          psPrice.pcPrice,
          psPrice.pcStartDate,
          psPrice.pcEndDate,
          psPrice.pcStartTime,
          psPrice.pcEndTime,

          psPrice.pcNormal,
          psPrice.pcNormalStatus,
          psPrice.pcNormalTransType,
          psPrice.pcNormalType,
          psPrice.pcNormalTypeValue,
          psPrice.pcNormalPrice,
          psPrice.pcNormalStartDate,
          psPrice.pcNormalEndDate,
          psPrice.pcNormalStartTime,
          psPrice.pcNormalEndTime,

          psPrice.gpcNo,
          psPrice.gpcStatus,
          psPrice.gpcTransType,
          psPrice.gpcType,
          psPrice.gpcTypeValue,
          psPrice.gpcPrice,
          psPrice.gpcStartDate,
          psPrice.gpcEndDate,
          psPrice.gpcStartTime,
          psPrice.gpcEndTime,

          psPrice.priceFrom,
        ]).commit();
      }
      // for (const { sku, error } of errors) {
      //   ws.addRow([
      //     sku.SKU_CODE,
      //     sku.stores,
      //     sku.LINE_ID,
      //     sku.DIVISION_ID,
      //     sku.GROUP_ID,
      //     sku.DEPT_ID,
      //     sku.CATEGORY_ID,
      //     `Actived: ${sku.ACTIVED} | Deleted: ${sku.DELETED}`,
      //     sku.MEMBER_DISC_ITEM,
      //     sku.RETAIL_UOM,
      //     sku.POP3_DESC_VNM,
      //     '',
      //   ]).commit();
      // }
      await wb.commit();
    }
  }

  //   async psPricesByPcNO(pcNO: string) {
  //     const pcs = await this.pricechangeRespository.find({
  //       where: { PRICE_CHANGE_NO: pcNO },
  //     });
  //     const skus = _.uniq(pcs.map((i) => i.SKU));
  //     const { prices, errors } = await this.skuService.calcPrice(skus);
  //     const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
  //       filename: `specprices/pc-${pcNO}.xlsx`,
  //     });
  //     const ws = wb.addWorksheet(undefined, {
  //       views: [{ state: 'frozen', ySplit: 1 }],
  //     });
  //     ws.autoFilter = `A1:AV1`;
  //     ws.addRow([
  //       'sku',
  //       'store',
  //       'line',
  //       'division',
  //       'group',
  //       'dept',
  //       'category',
  //       'status',
  //       'member',
  //       'uomEn',
  //       'uomVn',

  //       'normal price',
  //       'promo price',
  //       'ori promo price',
  //       'start time',
  //       'end time',
  //       'member mark',

  //       'pc no',
  //       'pc status',
  //       'pc trans type',
  //       'pc type',
  //       'pc type value',
  //       'pc price',
  //       'pc start date',
  //       'pc end start',
  //       'pc start time',
  //       'pc end time',

  //       'pc normal',
  //       'pc normal status',
  //       'pc normal trans type',
  //       'pc normal type',
  //       'pc normal type value',
  //       'pc normal price',
  //       'pc normal start date',
  //       'pc normal end date',
  //       'pc normal start time',
  //       'pc normal end time',

  //       'gpc no',
  //       'gpc status',
  //       'gpc trans type',
  //       'gpc type',
  //       'gpc type value',
  //       'gpc price',
  //       'gpc start date',
  //       'gpc end date',
  //       'gpc start time',
  //       'gpc end time',

  //       'price from',
  //     ]).commit();
  //     for (const psPrice of prices) {
  //       ws.addRow([
  //         psPrice.sku,
  //         psPrice.store,
  //         psPrice.line,
  //         psPrice.division,
  //         psPrice.group,
  //         psPrice.dept,
  //         psPrice.category,
  //         psPrice.status,
  //         psPrice.member,
  //         psPrice.uomEn,
  //         psPrice.uomVn,

  //         psPrice.normalPrice,
  //         psPrice.promoPrice,
  //         psPrice.oriPromoPrice,
  //         psPrice.startTime,
  //         psPrice.endTime,
  //         psPrice.memberMark,

  //         psPrice.pcNo,
  //         psPrice.pcStatus,
  //         psPrice.pcTransType,
  //         psPrice.pcType,
  //         psPrice.pcTypeValue,
  //         psPrice.pcPrice,
  //         psPrice.pcStartDate,
  //         psPrice.pcEndDate,
  //         psPrice.pcStartTime,
  //         psPrice.pcEndTime,

  //         psPrice.pcNormal,
  //         psPrice.pcNormalStatus,
  //         psPrice.pcNormalTransType,
  //         psPrice.pcNormalType,
  //         psPrice.pcNormalTypeValue,
  //         psPrice.pcNormalPrice,
  //         psPrice.pcNormalStartDate,
  //         psPrice.pcNormalEndDate,
  //         psPrice.pcNormalStartTime,
  //         psPrice.pcNormalEndTime,

  //         psPrice.gpcNo,
  //         psPrice.gpcStatus,
  //         psPrice.gpcTransType,
  //         psPrice.gpcType,
  //         psPrice.gpcTypeValue,
  //         psPrice.gpcPrice,
  //         psPrice.gpcStartDate,
  //         psPrice.gpcEndDate,
  //         psPrice.gpcStartTime,
  //         psPrice.gpcEndTime,

  //         psPrice.priceFrom,
  //       ]).commit();
  //     }
  //     for (const { sku, error } of errors) {
  //       ws.addRow([
  //         sku.SKU_CODE,
  //         sku.STORES,
  //         sku.LINE_ID,
  //         sku.DIVISION_ID,
  //         sku.GROUP_ID,
  //         sku.DEPT_ID,
  //         sku.CATEGORY_ID,
  //         `Actived: ${sku.ACTIVED} | Deleted: ${sku.DELETED}`,
  //         sku.MEMBER_DISC_ITEM,
  //         sku.RETAIL_UOM,
  //         sku.POP3_DESC_VNM,
  //         '',
  //         error,
  //       ]).commit();
  //     }
  //     await wb.commit();
  //   }

  //   async psPricesBySkus(skus: string[]) {
  //     const { prices, errors } = await this.skuService.calcPrice(skus);
  //     return { prices, errors };
  //   }

  //   async skusHaveImage() {
  //     const skus = await this.skuRespository.createQueryBuilder('t1').leftJoinAndSelect('t1.SKU_IMAGE', 't2').getMany();
  //     const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
  //       filename: `specprices/skusHaveImage.xlsx`,
  //     });
  //     const ws = wb.addWorksheet(undefined, {
  //       views: [{ state: 'frozen', ySplit: 1 }],
  //     });
  //     ws.autoFilter = `A1:AV1`;
  //     ws.addRow([
  //       'sku',
  //       'image',
  //       'selling point 1',
  //       'selling point 2',
  //       'selling point 3',
  //       'selling point 4',
  //       'selling point 5',
  //     ]).commit();
  //     for (const sku of skus) {
  //       ws.addRow([
  //         sku.SKU_CODE,
  //         sku.SKU_IMAGE ? 1 : 0,
  //         sku.SELLING_POINT1,
  //         sku.SELLING_POINT2,
  //         sku.SELLING_POINT3,
  //         sku.SELLING_POINT4,
  //         sku.SELLING_POINT5,
  //       ]).commit();
  //     }
  //     await wb.commit();
  //   }

  async insertPsPrices(onlyDepts?: string[]) {
    try {
      const filesName = await fs.readdir(`src/newsku`);
      for (const [index, fileName] of filesName.entries()) {
        if (onlyDepts && onlyDepts.length > 0) {
          if (!onlyDepts.includes(fileName.split('.')[0])) continue;
        }
        this.logger.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} - Xử lý file ${fileName}`);
        const wbPS = new ExcelJS.stream.xlsx.WorkbookReader(`src/newsku/${fileName}`, {});
        const psPrices = [] as PriceEntity[];
        for await (const worksheetReader of wbPS) {
          for await (const row of worksheetReader) {
            if (row.number > 1) {
              psPrices.push(
                readConnection.getRepository(PriceEntity).create({
                  sku: row.values[1],
                  store: row.values[2],
                  line: row.values[3],
                  division: row.values[4],
                  group: row.values[5],
                  dept: row.values[6],
                  category: row.values[7],
                  status: row.values[8],
                  member: row.values[9] ? row.values[9] : 'N',
                  uomEn: row.values[10],
                  uomVn: row.values[11],
                  normalPrice: row.values[12],
                  promoPrice: row.values[13],
                  oriPromoPrice: row.values[14],
                  startTime: row.values[15]
                    ? new Date(Math.round((row.values[15] - (25567 + 2)) * 86400000))
                    : undefined,
                  endTime: row.values[16] ? new Date(Math.round((row.values[16] - (25567 + 2)) * 86400000)) : undefined,
                  memberMark: row.values[17],
                  pcNo: row.values[18],
                  pcStatus: row.values[19],
                  pcTransType: row.values[20],
                  pcType: row.values[21],
                  pcTypeValue: row.values[22],
                  pcPrice: row.values[23],
                  pcStartDate: row.values[24],
                  pcEndDate: row.values[25],
                  pcStartTime: row.values[26],
                  pcEndTime: row.values[27],
                  pcNormal: row.values[28],
                  pcNormalStatus: row.values[29],
                  pcNormalTransType: row.values[30],
                  pcNormalType: row.values[31],
                  pcNormalTypeValue: row.values[32],
                  pcNormalPrice: row.values[33],
                  pcNormalStartDate: row.values[34],
                  pcNormalEndDate: row.values[35],
                  pcNormalStartTime: row.values[36],
                  pcNormalEndTime: row.values[37],
                  gpcNo: row.values[38],
                  gpcStatus: row.values[39],
                  gpcTransType: row.values[40],
                  gpcType: row.values[41],
                  gpcTypeValue: row.values[42],
                  gpcPrice: row.values[43],
                  gpcStartDate: row.values[44],
                  gpcEndDate: row.values[45],
                  gpcStartTime: row.values[46],
                  gpcEndTime: row.values[47],
                  priceFrom: row.values[48],
                }),
              );
            }
          }
        }
        const chunks = _.chunk(psPrices, 100);
        this.logger.log(
          `${moment().format('DD/MM/YYYY HH:mm:ss')} - Tổng cộng ${psPrices.length} record, chia làm ${chunks.length
          } chunks`,
        );
        for (const [chunkIndex, chunk] of chunks.entries()) {
          // if (chunkIndex > 5) continue;
          this.logger.log(
            `${moment().format('DD/MM/YYYY HH:mm:ss')} - Insert chunk ${chunkIndex + 1}/${chunks.length} ...`,
          );
          await this.priceServiceRepo.savePrices(chunk)
          this.logger.log(
            `${moment().format('DD/MM/YYYY HH:mm:ss')} - Inserted ${chunkIndex + 1}/${chunks.length} chunk`,
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //   async setPCDeleted(pcNos: string[]) {
  //     // const filesName = await fs.readdir(`pfprices/report`);
  //     // const data = [];
  //     // for (const fileName of filesName) {
  //     //   let wb = new ExcelJS.Workbook();
  //     //   wb = await wb.xlsx.readFile(`pfprices/report/${fileName}`);
  //     //   const ws = wb.getWorksheet(1);
  //     //   ws.eachRow((row, rowNum) => {
  //     //     if (rowNum > 1) {
  //     //       const pcNormal = row.values[13];
  //     //       const pcNormalDiff = row.values[15];
  //     //       const sku = row.values[6];
  //     //       const store = row.values[1];
  //     //       if (pcNormal && pcNormalDiff === 1 && pcNos.includes(pcNormal)) {
  //     //         data.push({
  //     //           pcNormal,
  //     //           sku,
  //     //           store,
  //     //         });
  //     //       }
  //     //     }
  //     //   });
  //     // }
  //     const queryRunner = this.connection.createQueryRunner();
  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();
  //     try {
  //       // for (const item of data) {
  //       //   const pc = await this.pricechangeRespository.findOne({
  //       //     where: {
  //       //       PRICE_CHANGE_NO: item.pcNormal,
  //       //       SKU: item.sku,
  //       //       STORE: item.store,
  //       //     },
  //       //   });
  //       //   pc.STATUS = 'D';
  //       //   await queryRunner.manager.save(pc);
  //       // }
  //       const pcs = await this.pricechangeRespository
  //         .createQueryBuilder('t1')
  //         .where('t1.PRICE_CHANGE_NO in (:...pcNos)', { pcNos })
  //         .getMany();
  //       for (const pc of pcs) {
  //         pc.STATUS = 'D';
  //       }
  //       await queryRunner.manager.save(pcs);
  //       await queryRunner.commitTransaction();
  //     } catch (error) {
  //       console.log(error);
  //       await queryRunner.rollbackTransaction();
  //     } finally {
  //       await queryRunner.release();
  //     }
  //   }

  //   async getReportDept() {
  //     const filesName = await fs.readdir(`pfprices/report`);
  //     const data = [];
  //     for (const fileName of filesName) {
  //       let wb = new ExcelJS.Workbook();
  //       wb = await wb.xlsx.readFile(`pfprices/report/${fileName}`);
  //       const ws = wb.getWorksheet(1);
  //       ws.eachRow((row, rowNum) => {
  //         if (rowNum > 1) {
  //           const dept = row.values[5];
  //           data.push({ dept });
  //         }
  //       });
  //     }
  //     return _.uniq(data.map((i) => i.dept));
  //   }

  //   async reCompareCheckedFiles() {
  //     const filesName = await fs.readdir(`pfprices/checkpc`);
  //     for (const checkedFileName of filesName) {
  //       const checkedData = [];
  //       let wbChecked = new ExcelJS.Workbook();
  //       wbChecked = await wbChecked.xlsx.readFile(`pfprices/checkpc/${checkedFileName}`);
  //       const wsChecked = wbChecked.getWorksheet(1);
  //       wsChecked.eachRow((row, rowNum) => {
  //         if (rowNum > 1) {
  //           const sku = row.values[6];
  //           const normalStatus = row.values[14];
  //           const normalCreate = row.values[15];
  //           const promoStatus = row.values[17];
  //           const promoCreate = row.values[18];
  //           const normalPC = row.values[21];
  //           const promoPC = row.values[22];
  //           checkedData.push({
  //             sku,
  //             normalStatus,
  //             normalCreate,
  //             promoStatus,
  //             promoCreate,
  //             normalPC,
  //             promoPC,
  //           });
  //         }
  //       });
  //       const reportData = [];
  //       let wbReport = new ExcelJS.Workbook();
  //       wbReport = await wbReport.xlsx.readFile(`pfprices/report/${checkedFileName}`);
  //       const wsReport = wbReport.getWorksheet(1);
  //       wsReport.eachRow((row, rowNum) => {
  //         if (rowNum > 1) {
  //           const store = row.values[1];
  //           const line = row.values[2];
  //           const division = row.values[3];
  //           const group = row.values[4];
  //           const dept = row.values[5];
  //           const sku = row.values[6];
  //           const normalPrice = row.values[7];
  //           const promoPrice = row.values[8];
  //           const memberPrice = row.values[9];
  //           const groupPrice = row.values[10];
  //           const psNormalPrice = row.values[11];
  //           const psPromoPrice = row.values[12];
  //           const psNormalPC = row.values[13];
  //           const psPromoPC = row.values[14];
  //           const normalDiff = row.values[15];
  //           const promoDiff = row.values[16];
  //           reportData.push({
  //             store,
  //             line,
  //             division,
  //             group,
  //             dept,
  //             sku,
  //             normalPrice,
  //             promoPrice,
  //             memberPrice,
  //             groupPrice,
  //             psNormalPrice,
  //             psPromoPrice,
  //             psNormalPC,
  //             psPromoPC,
  //             normalDiff,
  //             promoDiff,
  //           });
  //         }
  //       });
  //       const wb = new ExcelJS.stream.xlsx.WorkbookWriter({
  //         filename: `pfprices/recompare/${checkedFileName}`,
  //       });
  //       const ws = wb.addWorksheet(undefined, {
  //         views: [{ state: 'frozen', ySplit: 1 }],
  //       });
  //       ws.autoFilter = `A1:V1`;
  //       ws.columns = [
  //         { key: 'store', header: 'store' },
  //         { key: 'line', header: 'line' },
  //         { key: 'division', header: 'division' },
  //         { key: 'group', header: 'group' },
  //         { key: 'dept', header: 'dept' },
  //         { key: 'sku', header: 'sku' },
  //         { key: 'normalPrice', header: 'normal price' },
  //         { key: 'promoPrice', header: 'promo price' },
  //         { key: 'memberPrice', header: 'member price' },
  //         { key: 'groupPrice', header: 'group price' },
  //         { key: 'psNormalPrice', header: 'ps normal price' },
  //         { key: 'psPromoPrice', header: 'ps promo price' },
  //         { key: 'psNormalPC', header: 'ps normal PC' },
  //         { key: 'normalStatus', header: 'Status' },
  //         { key: 'normalCreate', header: 'Create' },
  //         { key: 'psPromoPC', header: 'ps promo PC' },
  //         { key: 'promoStatus', header: 'Status' },
  //         { key: 'promoCreate', header: 'Create' },
  //         { key: 'normalDiff', header: 'normal diff' },
  //         { key: 'promoDiff', header: 'promo diff' },
  //         { key: 'normalPC', header: 'profit normal PC' },
  //         { key: 'promoPC', header: 'profit promo PC' },
  //       ];
  //       for (const reportItem of reportData) {
  //         for (const checkedItem of checkedData) {
  //           if (reportItem.sku === checkedItem.sku) {
  //             reportItem.normalStatus = checkedItem.normalStatus;
  //             reportItem.normalCreate = checkedItem.normalCreate;
  //             reportItem.promoStatus = checkedItem.promoStatus;
  //             reportItem.promoCreate = checkedItem.promoCreate;
  //             reportItem.normalPC = checkedItem.normalPC;
  //             reportItem.promoPC = checkedItem.promoPC;
  //           }
  //         }
  //         ws.addRow(reportItem).commit();
  //       }
  //       await wb.commit();
  //     }
  //     return;
  //   }
}
