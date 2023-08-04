import { Body, Controller, Post, Get } from '@nestjs/common';
import { CompareService } from './compare.service';

@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Post('testCalc')
  async testCalc(@Body('stores') stores: string[]) {
    await this.compareService.testReadFunction();
    console.log("Done!");
    return 1;
  }
  @Post('xlsToXlsx')
  async xlsToXlsx() {
    const data = await this.compareService.xlsToXlsx();
    return data;
  }
  @Post('mergePFPrices')
  async mergePFPrices() {
    const data = await this.compareService.mergePFPrices();
    return data;
  }
  @Post('mergePSPrices')
  async mergePSPrices() {
    const data = await this.compareService.mergePSPrices();
    return data;
  }

  @Get('concatenate')
  async concatName() {
    const data = await this.compareService.concatFileName();
    return data;
  }
  @Post('exportAllPsPrices')
  async exportAllPsPrices(@Body('onlyDepts') onlyDepts: string[]) {
    const data = await this.compareService.exportAllPsPrices(onlyDepts);
    return data;
  }
  @Post('splitPfPrices')
  async splitPfPrices() {
    const data = await this.compareService.splitPfPrices();
    return data;
  }
  @Post('comparePrices')
  async comparePrices(@Body('onlyDepts') onlyDepts: string[]) {
    const data = await this.compareService.comparePrices(onlyDepts);
    return data;
  }

  @Post('exportPsPrices')
  async exportPsPrices(@Body('onlyStores') onlyStores: string[]) {
    const data = await this.compareService.exportPsPricesTable(onlyStores)
    return data;
  }

  // @Post('all')
  // async all() {
  //   await this.compareService.xlsToXlsx();
  //   await this.compareService.mergePFPrices();
  //   await this.compareService.comparePrices();
  //   return;
  // }

  //   @Post('psPricesByPcNO')
  //   async psPricesByPcNO(@Body('pcNO') pcNo: string) {
  //     const data = await this.compareService.psPricesByPcNO(pcNo);
  //     return data;
  //   }
  //   @Post('psPricesBySkus')
  //   async psPricesBySkus(@Body('skus') skus: string[]) {
  //     const data = await this.compareService.psPricesBySkus(skus);
  //     return data;
  //   }

  //   @Post('skusHaveImage')
  //   async skusHaveImage() {
  //     const data = await this.compareService.skusHaveImage();
  //     return data;
  //   }

    @Post('insertPsPrices')
    async insertPsPrices(@Body('onlyDepts') onlyDepts: string[]) {
      const data = await this.compareService.insertPsPrices(onlyDepts);
      return data;
    }

  //   @Post('setPCDeleted')
  //   async setPCDeleted(@Body('pcNos') pcNos: string[]) {
  //     const data = await this.compareService.setPCDeleted(pcNos);
  //     return data;
  //   }

  //   @Post('getReportDept')
  //   async getReportDept() {
  //     const data = await this.compareService.getReportDept();
  //     return data;
  //   }

  //   @Post('reCompareCheckedFiles')
  //   async reCompareCheckedFiles() {
  //     const data = await this.compareService.reCompareCheckedFiles();
  //     return data;
  //   }
}
