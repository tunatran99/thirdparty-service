
export type DataProperties = Readonly<
  Required<{
  CATEGORY: string;
  SKU: string;
  STORE: string;
  DESCRIPTION: string;
  STATUS: boolean;
  SKU_IMAGE: string;
  SEQUENCE: number;
  }>
>;

export interface IData {
  CATEGORY: string;
  SKU: string;
  STORE: string;
  DESCRIPTION: string;
  STATUS: boolean;
  SKU_IMAGE: string;
  SEQUENCE: number;
  create: () => void;
  commit: () => void;
}

// export class DataImplement extends AggregateRoot implements IData {
//   constructor(properties: DataProperties) {
//     super();
//     Object.assign(this, properties);
//   }

//   create(): void {}
// }
