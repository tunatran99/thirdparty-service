import { ICommand } from '@nestjs/cqrs';

export class DownloadPriceToMobile implements ICommand {
  constructor(readonly skuCodes: string[]) {}
}
