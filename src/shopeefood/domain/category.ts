import { AggregateRoot } from "@nestjs/cqrs";

export type CategoryEssentialProperties = Readonly<
  Required<{
    CATEGORY_CODE: string;
    CATEGORY_NAME: string;
    SEQUENCE: number;
    ACTIVE: string;
  }>
>;

export type CategoryOptionalProperties = Readonly<
  Partial<{
    id: number;
    ANCESTOR: string;
  }>
>;

export type CategoryProperties = CategoryEssentialProperties & CategoryOptionalProperties;

export interface ICategory {
  create: () => void;
  commit: () => void;
}

export class CategoryImplement extends AggregateRoot implements ICategory {
  private readonly id: number;

  constructor(properties: CategoryProperties) {
    super();
    Object.assign(this, properties);
  }

  create(): void {
    // this.apply(new UserOpenedEvent(this.id, this.email));
  }
}