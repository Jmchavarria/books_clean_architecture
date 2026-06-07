import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCategoryUseCase } from '../application/use-cases/create-category-use-case/create-category.use-case';
import { GetAllCategoriesUseCase } from '../application/use-cases/find-all-categories-use-case/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from '../application/use-cases/find-category-by-id/find-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../application/use-cases/update-category/update-category.use-case';
import { CategoryRepository } from '../domain/repositories/category.reposiroty';
import { CategoriesController } from './http/categories.controller';
import { CategoryOrmEntity } from './persistence/entities/category.orm-entity';
import { CategoryRepositoryImpl } from './repositories/categories.repository.impl';
import { VerifyCategoryExistsUseCase } from '../application/use-cases/verify-category-exists/verify-category-exists.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrmEntity])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
    CreateCategoryUseCase,
    GetAllCategoriesUseCase,
    FindCategoryByIdUseCase,
    UpdateCategoryUseCase,
    VerifyCategoryExistsUseCase,
  ],
  exports: [CategoryRepository],
})
export class CategoryModule {}
