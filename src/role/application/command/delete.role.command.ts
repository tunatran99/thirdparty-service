import { ICommand } from '@nestjs/cqrs';

export class deleteRole implements ICommand {
  constructor(readonly id: number) {}
}
