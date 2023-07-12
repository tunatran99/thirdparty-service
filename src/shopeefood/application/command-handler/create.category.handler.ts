import { Inject, BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Transactional } from 'libs/transaction.decorator';
import { ICategory } from 'src/shopeefood/domain/category';
import { CategoryEntity } from 'src/shopeefood/infratsructure/entity/category';
import { CategoryRepositoryImplement } from 'src/shopeefood/infratsructure/repository/category.repository.implement';
import * as xlsx from 'xlsx';
import { CreateCategory } from '../command/create.category.command';

@CommandHandler(CreateCategory)
export class CreateCategoryHandler implements ICommandHandler<CreateCategory, number> {
  @Inject()
  private readonly DataRepo: CategoryRepositoryImplement;

  @Transactional()
  async execute(data: CreateCategory): Promise<number> {
    if (!data.excelFile) {
      return 0;
    }
    else {
      const workbook = xlsx.read(data.excelFile.buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData: ICategory[] = xlsx.utils.sheet_to_json(worksheet);
      // console.log(excelData)

      const entities = excelData.map((item) => {
        const entity = new CategoryEntity();
        entity.CATEGORY_CODE = item.CATEGORY_CODE;
        entity.SEQUENCE = item.SEQUENCE;
        return entity;
      });

      const savedItems = await this.DataRepo.save(entities);

      return 1;
    }
  }
}
