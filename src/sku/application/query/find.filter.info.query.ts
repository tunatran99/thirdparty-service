import { IQuery } from '@nestjs/cqrs';

export class FindFilterInfoQuery implements IQuery {
  constructor(readonly partnerId?: string[]) { }
}
export class FindStore implements IQuery {
  constructor(readonly storeId?: string[], readonly refId?: number) { }
}
export class FindDivision implements IQuery {
  constructor(readonly refId?: string[]) { }
}
export class FindGroup implements IQuery {
  constructor(readonly refId?: string[]) { }
}
export class FindDepartment implements IQuery {
  constructor(readonly refId?: string[]) { }
}
export class FindCategory implements IQuery {
  constructor(readonly refId?: string[]) { }
}