import { AggregateRoot } from "@nestjs/cqrs";

export type DataEssentialProperties = Readonly<
  Required<{

  }>
>;

export type DataOptionalProperties = Readonly<
  Partial<{
    CATEGORY_ID: number;
    SKU_ID: number;
    STORE: string;
    DESCRIPTION: string;
    STATUS: number;
    SKU_IMAGE: string;
    SEQUENCE: number;
    SPF_DISH_ID: number;
  }>
>;

export type DataProperties = DataEssentialProperties & DataOptionalProperties;

export interface IData {
  create: () => void;
  update: (data: Partial<DataProperties>) => void;
  commit: () => void;
}

export class DataImplement extends AggregateRoot implements IData {
  private readonly id: number;

  constructor(properties: DataProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new UserOpenedEvent(this.id, this.email));
  }

  update(data: Partial<DataProperties>): void {
    Object.assign(this, data);
  }
}