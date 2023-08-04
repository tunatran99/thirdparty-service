import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPOByCodesScheduleQuery } from '../query/find.po.bycodes.schedule.query';
import { Inject } from '@nestjs/common';
import { POQueryImplement } from 'src/bookingapp/infratsructure/query/po.query.implement';
import { POFoundByCodesEvent } from '../event/po.found.bycodes';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import _ from 'lodash';

@QueryHandler(FindPOByCodesScheduleQuery)
export class FindPOByCodesScheduleQueryHandler implements IQueryHandler<FindPOByCodesScheduleQuery, void> {
  constructor(readonly eventBus: EventBus) { }

  @Inject()
  private readonly poQuery: POQueryImplement;

  async execute(command: FindPOByCodesScheduleQuery): Promise<void> {
    let poCodes = await this.poQuery.findAllCodes()
    poCodes = poCodes.map(po => po.purchase_code)
    // const chunks = _.chunk(poCodes, 2000);
    // console.log(chunks.length)

    // for (const [chunkIndex, chunk] of chunks.entries()) {
    //   // console.log(chunk)
    //   // if (chunkIndex > 12) {
    //   //   const data = await this.poQuery.findByCodes(chunk as string[]);
    //   //   this.eventBus.publish(new POFoundByCodesEvent(data));
    //   // }
    //   const data = await this.poQuery.findByCodesSchedule(chunk as string[]);
    //   this.eventBus.publish(new POFoundByCodesEvent(data));
    //   console.log(`done + ${chunkIndex}`)
    // }
    console.log("query")
    const data = await this.poQuery.findByCodes(poCodes);
    console.log("Publish")
    this.eventBus.publish(new POFoundByCodesEvent(data));
  }
}
