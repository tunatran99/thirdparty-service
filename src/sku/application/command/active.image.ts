import { ICommand } from '@nestjs/cqrs';

export class ActiveImage implements ICommand {
  constructor(
    readonly item: Readonly<{
      partnerId: number;
      skuId: number;
      active: number;
    }>,
  ) {}
}
