
export type CategoryProperties = Readonly<
  Required<{
    CATEGORY_CODE: string;
    SEQUENCE: number;
  }>
>;

export interface ICategory {
    CATEGORY_CODE: string;
    SEQUENCE: number;
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
