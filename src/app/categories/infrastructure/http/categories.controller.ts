import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateCategoryUseCase } from "../../application/use-cases/create-category-use-case/create-category.use-case";
import { DeleteCategoryUseCase } from "../../application/use-cases/delete-category-use-case/delete-category-use-case";
import { FindAllCategoriesFiltersUseCase } from "../../application/use-cases/find-all-categories-use-case/find-all-categories.use-case";
import { FindCategoryByIdUseCase } from "../../application/use-cases/find-category-by-id/find-category-by-id.use-case";
import { UpdateCategoryUsCase } from "../../application/use-cases/update-category-use-case/update-category.use-case";
import { CreateCategoryHttpDto } from "./create-category-http-dto";
import { FindAllCategoriesFiltersHttpDto } from "./find-all-categories-http-dto";

@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly findAllCategoriesFiltersUseCase: FindAllCategoriesFiltersUseCase,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUsCase,
  ) {}

  @Post()
  save(@Body() data: CreateCategoryHttpDto) {
    return this.createCategoryUseCase.execute(data);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.findCategoryByIdUseCase.execute(id);
  }

  @Get()
  findAll(@Query() filters: FindAllCategoriesFiltersHttpDto) {
    return this.findAllCategoriesFiltersUseCase.execute(filters);
  }

  @Put(":id")
  updateCategory(@Param("id") id: string, @Body() data: CreateCategoryHttpDto) {
    return this.updateCategoryUseCase.execute(id, data);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.deleteCategoryUseCase.execute(id);
  }
}
