import { ICommand } from '@nestjs/cqrs';

export class UpdateAppliedList implements ICommand {
  constructor(
    readonly items: Readonly<{
      partnerId: string;
      sku: string;
      store: string;
      active: boolean;
    }>[],
  ) {}
}
