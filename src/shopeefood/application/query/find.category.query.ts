import { IQuery } from '@nestjs/cqrs';
import { SearchDTO } from 'src/shopeefood/presentation/dto/common.dto';

export class FindCategoryQuery implements IQuery {
  constructor(readonly q: SearchDTO) {}
}
