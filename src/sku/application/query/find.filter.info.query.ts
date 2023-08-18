import { IQuery } from '@nestjs/cqrs';

export class FindFilterInfoQuery implements IQuery {}
export class FindDivision implements IQuery {
    constructor(readonly refId?: string[]) {}
  }
  export class FindGroup implements IQuery {
    constructor(readonly refId?: string[]) {}
  }
  export class FindDepartment implements IQuery {
    constructor(readonly refId?: string[]) {}
  }
  export class FindCategory implements IQuery {
    constructor(readonly refId?: string[]) {}
  }