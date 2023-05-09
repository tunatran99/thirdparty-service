import { ICommandHandler, IEventHandler } from '@nestjs/cqrs';

import { DatabaseService, writeConnection } from '@libs/database.module';
import { Inject } from '@nestjs/common';

export function Transactional() {
  const injectDbService = Inject(DatabaseService);

  return (target: ICommandHandler | IEventHandler, key: string, descriptor: PropertyDescriptor): void => {
    injectDbService(target, 'dbService');

    const originalMethod = descriptor.value as (...args) => Promise<unknown>;

    descriptor.value = new Proxy(originalMethod, {
      apply: async (proxyTarget, thisArg, args) => {
        const dbService: DatabaseService = thisArg.dbService;

        if (writeConnection.isReleased) {
          await dbService.createNewWriteConnection();
        }

        if (!writeConnection.isTransactionActive) {
          await writeConnection.startTransaction();
        }

        try {
          const result = await proxyTarget.apply(thisArg, args);

          if (writeConnection.isTransactionActive) {
            await writeConnection.commitTransaction();
          }

          return result;
        } catch (error) {
          if (writeConnection.isTransactionActive) {
            await writeConnection.rollbackTransaction();
          }
          throw error;
        } finally {
          await writeConnection.release();
        }
      },
    });
  };
}
