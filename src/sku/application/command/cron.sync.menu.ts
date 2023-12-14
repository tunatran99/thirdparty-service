import { ICommand } from '@nestjs/cqrs';

export class CronSyncMenu implements ICommand {
    constructor(readonly store?: string) {}
}
