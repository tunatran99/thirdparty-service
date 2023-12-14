import { UtilityImplement } from "@libs/utility.module";
import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { IData, DataImplement, DataProperties } from "./data";

type createDataOptions = Readonly<{
  CATEGORY_ID: number;
  SKU_ID: number;
  STORE: string;
  DESCRIPTION: string;
  STATUS: number;
  SKU_IMAGE: string;
  SEQUENCE: number;
  SPF_DISH_ID: number;
}>;

export class DataFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly util: UtilityImplement;

  create(options: createDataOptions): IData {
    return this.eventPublisher.mergeObjectContext(
      new DataImplement({
        ...options
      }),
    );
  }

  reconstitute(properties: DataProperties): IData {
    return this.eventPublisher.mergeObjectContext(new DataImplement(properties));
  }
}
