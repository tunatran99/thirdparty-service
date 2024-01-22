import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { ICategory } from 'src/shopeefood/domain/category';
import { CategoryEntity } from 'src/shopeefood/infratsructure/entity/category';
import { CategoryRepositoryImplement } from 'src/shopeefood/infratsructure/repository/category.repository.implement';
import * as xlsx from 'xlsx';
import { CreateCategory } from '../command/create.category.command';
import { CategoryFactory } from 'src/shopeefood/domain/category.factory';

@CommandHandler(CreateCategory)
export class CreateCategoryHandler implements ICommandHandler<CreateCategory, void> {
  @Inject()
  private readonly CateRepo: CategoryRepositoryImplement;
  @Inject() private readonly cateFactory: CategoryFactory;

  @Transactional()
  async execute(data: CreateCategory): Promise<void> {
    if (!data.excelFile) {
      const category = this.cateFactory.create({
        CATEGORY_CODE: data.body.categoryCode,
        CATEGORY_NAME: data.body.categoryName,
        SEQUENCE: data.body.categorySequence,
        ACTIVE: data.body.active,
        ANCESTOR: data.body.categoryAncestor
      });

      category.create();

      await this.CateRepo.save(category);

      category.commit();
    }
    else {
      const workbook = xlsx.read(data.excelFile.buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData: any[] = xlsx.utils.sheet_to_json(worksheet);

      const categories = excelData.map((item) => {
        const category = this.cateFactory.create({
          CATEGORY_CODE: item.CATEGORY_CODE,
          CATEGORY_NAME: item.CATEGORY_NAME,
          SEQUENCE: item.SEQUENCE,
          ACTIVE: item.ACTIVE,
          ANCESTOR: item.ANCESTOR
        });

        return category;
      });

      await this.CateRepo.save(categories);
    }
  }
}
