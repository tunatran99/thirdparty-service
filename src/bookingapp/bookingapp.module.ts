import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DepartmentCallBAEventHandler } from './application/event-handler/found.department.callba.handler';
import { DepartmentWriteFileEventHandler } from './application/event-handler/found.department.writefile.handler';
import { LineCallBAEventHandler } from './application/event-handler/found.line.callba.handler';
import { LineWriteFileEventHandler } from './application/event-handler/found.line.writefile.handler';
import { POCallBAEventHandler } from './application/event-handler/found.po.callba.handler';
import { POWriteFileEventHandler } from './application/event-handler/found.po.writefile.handler';
import { ProductCallBAEventHandler } from './application/event-handler/found.product.callba.handler';
import { ProductWriteFileEventHandler } from './application/event-handler/found.product.writefile.handler';
import { SupplierCallBAEventHandler } from './application/event-handler/found.supplier.callba.handler';
import { SupplierWriteFileEventHandler } from './application/event-handler/found.supplier.writefile.handler';
import { FindDepartmentByCodesQueryHandler } from './application/query-handler/find.department.bycodes.handler';
import { FindLineByCodesQueryHandler } from './application/query-handler/find.line.bycodes.handler';
import { FindPOByCodesQueryHandler } from './application/query-handler/find.po.bycodes.handler';
import { FindProductByCodesQueryHandler } from './application/query-handler/find.product.bycodes.handler';
import { FindSupplierByCodesQueryHandler } from './application/query-handler/find.supplier.bycodes.handler';
import { BookingappService } from './domain/bookingapp.service';
import { DepartmentQueryImplement } from './infratsructure/query/department.query.implement';
import { LineQueryImplement } from './infratsructure/query/line.query.implement';
import { POQueryImplement } from './infratsructure/query/po.query.implement';
import { ProductQueryImplement } from './infratsructure/query/product.query.implement';
import { SupplierQueryImplement } from './infratsructure/query/supplier.query.implement';
import { BookingappController } from './presentation/bookingapp.controller';

const infrastructure = [
  SupplierQueryImplement,
  LineQueryImplement,
  DepartmentQueryImplement,
  ProductQueryImplement,
  POQueryImplement,
];

const application = [
  FindSupplierByCodesQueryHandler,
  FindLineByCodesQueryHandler,
  FindDepartmentByCodesQueryHandler,
  FindProductByCodesQueryHandler,
  FindPOByCodesQueryHandler,
  SupplierCallBAEventHandler,
  LineCallBAEventHandler,
  DepartmentCallBAEventHandler,
  ProductCallBAEventHandler,
  POCallBAEventHandler,
  SupplierWriteFileEventHandler,
  LineWriteFileEventHandler,
  DepartmentWriteFileEventHandler,
  ProductWriteFileEventHandler,
  POWriteFileEventHandler,
];

const domain = [BookingappService];

@Module({
  imports: [CqrsModule],
  controllers: [BookingappController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class BookingappModule {}
