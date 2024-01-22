import { UtilityImplement } from "@libs/utility.module";
import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { ICategory, CategoryImplement, CategoryProperties } from "./category";

type createCategoryOptions = Readonly<{
  CATEGORY_CODE: string;
  CATEGORY_NAME: string;
  SEQUENCE: number;
  ACTIVE: string;
  ANCESTOR: string;
}>;

export class CategoryFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  @Inject() private readonly util: UtilityImplement;

  create(options: createCategoryOptions): ICategory {
    return this.eventPublisher.mergeObjectContext(
      new CategoryImplement({
        ...options
      }),
    );
  }

  reconstitute(properties: CategoryProperties): ICategory {
    return this.eventPublisher.mergeObjectContext(new CategoryImplement(properties));
  }
}
