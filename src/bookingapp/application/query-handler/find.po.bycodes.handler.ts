import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPOByCodesQuery } from '../query/find.po.bycodes.query';
import { Inject } from '@nestjs/common';
import { POQueryImplement } from 'src/bookingapp/infratsructure/query/po.query.implement';
import { POFoundByCodesEvent } from '../event/po.found.bycodes';
import { PriceServiceRepositoryImplement } from 'src/sku/infratsructure/repository/price.service.repository.implement';
import _ from 'lodash';

@QueryHandler(FindPOByCodesQuery)
export class FindPOByCodesQueryHandler implements IQueryHandler<FindPOByCodesQuery, void> {
  constructor(readonly eventBus: EventBus) { }

  @Inject()
  private readonly poQuery: POQueryImplement;

  async execute(command: FindPOByCodesQuery): Promise<void> {
    // let poCodes = await this.poQuery.findAllCodes()
    // poCodes = poCodes.map(po => po.purchase_code)
    // const chunks = _.chunk(poCodes, 2000);
    // console.log(chunks.length)

    // for (const [chunkIndex, chunk] of chunks.entries()) {
    //   // console.log(chunk)
    //   if (chunkIndex > 12) {
    //     const data = await this.poQuery.findByCodes(chunk as string[]);
    //     this.eventBus.publish(new POFoundByCodesEvent(data));
    //   }
    //   console.log(`done + ${chunkIndex}`)
    // }
    const data = await this.poQuery.findByCodes(command.codes);
    this.eventBus.publish(new POFoundByCodesEvent(data));
  }
}
