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

type Category = Readonly<{
  id: string,
  sequence: number,
  name: string,
  availableStatus: string,
  items: Item[]
}>

export class FindCategoryByCodesResult implements IQueryResult {
  constructor(
    readonly section: Readonly<{
      id: string,
      name: string,
      serviceHours: object,
      categories: string
    }>,
  ) { }
}
