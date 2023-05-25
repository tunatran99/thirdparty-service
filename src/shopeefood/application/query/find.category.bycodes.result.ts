import { IQueryResult } from '@nestjs/cqrs';

type Item = Readonly<{
  id: string,
  sequence: number,
  name: string,
  availableStatus: string,
  description: string,
  price: number,
  photos: string[],
}>

export class FindCategoryByCodesResult implements IQueryResult {
  constructor(
    readonly categories: Readonly<{
      id: string,
      sequence: number,
      name: string,
      availableStatus: string,
      items: Item[]
    }>[],
  ) { }
}
