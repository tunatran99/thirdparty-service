
export type DataProperties = Readonly<
  Required<{
  Category_ID: string;
  Category_Name_Level_1: string;
  Category_Name_Level_2: string;
  Category_Name_Level_3: string;
  SKU: string;
  productName: string;
  UOM: string;
  price: string;
  promoPrice: string;
  storeId: string;
  description: string;
  DELETED: number;
  }>
>;

export interface IData {
  Category_ID: string;
  Category_Name_Level_1: string;
  Category_Name_Level_2: string;
  Category_Name_Level_3: string;
  SKU: string;
  productName: string;
  UOM: string;
  price: string;
  promoPrice: string;
  storeId: string;
  description: string;
  DELETED: number;
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
