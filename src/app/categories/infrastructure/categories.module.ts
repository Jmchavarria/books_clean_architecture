import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateCategoryUseCase } from "../application/use-cases/create-category-use-case/create-category.use-case";
import { DeleteCategoryUseCase } from "../application/use-cases/delete-category-use-case/delete-category-use-case";
import { FindAllCategoriesFiltersUseCase } from "../application/use-cases/find-all-categories-use-case/find-all-categories.use-case";
import { FindCategoryByIdUseCase } from "../application/use-cases/find-category-by-id/find-category-by-id.use-case";
import { UpdateCategoryUsCase } from "../application/use-cases/update-category-use-case/update-category.use-case";
import { CategoryRepository } from "../domain/repositories/category.reposiroty";
import { CategoriesController } from "./http/categories.controller";
import { CategoryOrmEntity } from "./persistence/entities/category.orm-entity";
import { CategoryRepositoryImpl } from "./repositories/categories.repository.impl";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrmEntity])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
    CreateCategoryUseCase,
    FindAllCategoriesFiltersUseCase,
    FindCategoryByIdUseCase,
    UpdateCategoryUsCase,
    DeleteCategoryUseCase,
  ],
  exports: [CategoryRepository],
})
export class CategoryModule {}
