import { IEvent } from '@nestjs/cqrs';
import { FindDepartmentByCodesResult } from '../query/find.department.bycodes.result';

export class DepartmentFoundByCodesEvent implements IEvent {
  constructor(readonly eventData: FindDepartmentByCodesResult) {}
}
