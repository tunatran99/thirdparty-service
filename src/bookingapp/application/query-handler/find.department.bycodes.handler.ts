import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDepartmentByCodesQuery } from '../query/find.department.bycodes.query';
import { Inject } from '@nestjs/common';
import { DepartmentQueryImplement } from 'src/bookingapp/infratsructure/query/department.query.implement';
import { DepartmentFoundByCodesEvent } from '../event/department.found.bycodes';

@QueryHandler(FindDepartmentByCodesQuery)
export class FindDepartmentByCodesQueryHandler implements IQueryHandler<FindDepartmentByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) {}

  @Inject()
  private readonly departmentQuery: DepartmentQueryImplement;

  async execute(command: FindDepartmentByCodesQuery): Promise<void> {
    const data = await this.departmentQuery.findByCodes(command.codes);
    this.eventBus.publish(new DepartmentFoundByCodesEvent(data));
  }
}
