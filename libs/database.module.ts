import { Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { environment } from 'src/environment';

import { UserEntity } from 'src/user/infratsructure/entity/user';
import { UserRefreshTokenEntity } from 'src/user/infratsructure/entity/refresh.token';
import { PartnerEntity } from 'src/partner/infratsructure/entity/partner';
import { ApikeyEntity } from 'src/partner/infratsructure/entity/apikey';
import { IpWhitelistEntity } from 'src/partner/infratsructure/entity/ipwhitelist';
import { SupplierEntity } from 'src/bookingapp/infratsructure/entity/supplier';
import { LineEntity } from 'src/bookingapp/infratsructure/entity/line';
import { DepartmentEntity } from 'src/bookingapp/infratsructure/entity/department';
import { ProductEntity } from 'src/bookingapp/infratsructure/entity/product';
import { PurchaseOrderEntity } from 'src/bookingapp/infratsructure/entity/purchase_order';
import { PriceEntity } from 'src/sku/infratsructure/entity/price';
import { PartnerPriceEntity } from 'src/sku/infratsructure/entity/partner.price';
import { UomEntity } from 'src/sku/infratsructure/entity/uom';
import { SkuEntity } from 'src/sku/infratsructure/entity/sku';
import { ItemSellPriceEntity } from 'src/sku/infratsructure/entity/item_sell_price';
import { PricechangeEntity } from 'src/sku/infratsructure/entity/price_change';
import { GroupPricechangeEntity } from 'src/sku/infratsructure/entity/group_price_change';
import { StoreEntity } from 'src/sku/infratsructure/entity/store';
import { LogEntity } from 'src/log/infratsructure/entity/log';

interface WriteConnection {
  readonly startTransaction: (
    level?: 'READ UNCOMMITTED' | 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE',
  ) => Promise<void>;
  readonly commitTransaction: () => Promise<void>;
  readonly rollbackTransaction: () => Promise<void>;
  readonly isTransactionActive: boolean;
  readonly manager: EntityManager;
  readonly connect: () => Promise<any>;
  readonly isReleased: boolean;
  readonly release: () => Promise<void>;
}

interface ReadConnection {
  readonly getRepository: <T extends ObjectLiteral>(target: EntityTarget<T>) => Repository<T>;
  readonly query: (query: string) => Promise<void>;
  readonly createQueryBuilder: <Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner,
  ) => SelectQueryBuilder<Entity>;
}

export let writeConnection = {} as WriteConnection;
export let readConnection = {} as ReadConnection;

export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly dataSource = new DataSource({
    type: 'mysql',
    entities: [
      UserEntity,
      UserRefreshTokenEntity,
      PartnerEntity,
      ApikeyEntity,
      IpWhitelistEntity,
      PriceEntity,
      PartnerPriceEntity,
      UomEntity,
      SupplierEntity,
      LineEntity,
      DepartmentEntity,
      ProductEntity,
      PurchaseOrderEntity,
      SkuEntity,
      ItemSellPriceEntity,
      PricechangeEntity,
      GroupPricechangeEntity,
      StoreEntity,
      LogEntity,
    ],
    charset: 'utf8mb4_unicode_ci',
    host: environment.DB_HOST,
    port: environment.DB_PORT,
    database: environment.DB_NAME,
    username: environment.DB_USERNAME,
    password: environment.DB_PASSWORD,
    synchronize: environment.DB_SYNC,
    logging: environment.DB_LOGGING,
  });

  async onModuleInit(): Promise<void> {
    await this.dataSource.initialize();
    if (!this.dataSource.isInitialized) throw new Error('DataSource is not initialized');
    writeConnection = this.dataSource.createQueryRunner();
    await writeConnection.connect();
    readConnection = this.dataSource.manager;
  }

  async onModuleDestroy(): Promise<void> {
    await this.dataSource.destroy();
  }

  async createNewWriteConnection() {
    writeConnection = this.dataSource.createQueryRunner();
    await writeConnection.connect();
  }
}

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
