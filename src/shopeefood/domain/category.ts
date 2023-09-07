
export type CategoryProperties = Readonly<
  Required<{
    CATEGORY_CODE: string;
    CATEGORY_NAME: string;
    SEQUENCE: number;
    ACTIVE: string;
    ANCESTOR: string;
  }>
>;

export interface ICategory {
  CATEGORY_CODE: string;
  CATEGORY_NAME: string;
  SEQUENCE: number;
  ACTIVE: string;
  ANCESTOR: string;
  create: () => void;
  commit: () => void;
}

// export class CategoryImplement extends AggregateRoot implements ICategory {
//   constructor(properties: CategoryProperties) {
//     super();
//     Object.assign(this, properties);
//   }

//   create(): void {}
// }
