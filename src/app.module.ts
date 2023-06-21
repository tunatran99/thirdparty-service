import { Module, OnModuleInit } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@libs/database.module';
import { UserModule } from './user/user.module';
import { PartnerModule } from './partner/partner.module';
import { AppController } from './app.controller';
import { BookingappModule } from './bookingapp/bookingapp.module';
import { mkdirSync } from 'fs';
import { UtilityModule } from '@libs/utility.module';
import { SkuModule } from './sku/sku.module';
import { LogModule } from './log/log.module';
import { ShopeefoodModule } from './shopeefood/shopeefood.module';
import { DataModule } from './populate/populate.module';
import { CompareModule } from './app/compare/compare.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'public',
      serveRoot: '/public',
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UtilityModule,
    UserModule,
    PartnerModule,
    BookingappModule,
    LogModule,
    SkuModule,
    ShopeefoodModule,
    DataModule,
    CompareModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    mkdirSync('data/bookingapp', { recursive: true });
  }
}
