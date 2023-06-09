
type createDataOptions = Readonly<{
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
}>;

// export class DataFactory {
//   @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
//   @Inject() private readonly util: UtilityImplement;

//   create(options: createDataOptions): IData {
//     const common = {
//       createdAt: new Date(),
//       createdById: null,
//       updatedAt: null,
//       updatedById: null,
//       isDisabled: false,
//       version: 0,
//     };
//     return this.eventPublisher.mergeObjectContext(
//       new DataImplement({
//         ...options
//       }),
//     );
//   }

//   reconstitute(properties: DataProperties): IData {
//     return this.eventPublisher.mergeObjectContext(new DataImplement(properties));
//   }
// }
