import { Transactional } from "@libs/transaction.decorator";
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ActiveImage } from "../command/active.image";
import { PriceServiceRepositoryImplement } from "src/sku/infratsructure/repository/price.service.repository.implement";

@CommandHandler(ActiveImage)
export class ActiveImageHandler implements ICommandHandler<ActiveImage, void> {
  @Inject()
  private readonly priceServiceRepo: PriceServiceRepositoryImplement;

  @Transactional()
  async execute({ item }: ActiveImage): Promise<void> {
    await this.priceServiceRepo.activeImage(item);
  }
}