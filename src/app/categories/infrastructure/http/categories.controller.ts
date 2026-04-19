import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateCategoryUseCase } from "../../application/use-cases/create-category-use-case/create-category.use-case";
import { GetAllCategoriesUseCase } from "../../application/use-cases/find-all-categories-use-case/find-all-categories.use-case";
import { FindCategoryByIdUseCase } from "../../application/use-cases/find-category-by-id/find-category-by-id.use-case";
import { UpdateCategoryUsCase } from "../../application/use-cases/update-category-use-case/update-category.use-case";
import { CreateCategoryHttpDto } from "./http-dto/create-category-http-dto";
import { GetAllCategoriesHttpDto } from "./http-dto/get-all-categories-http-dto";

@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoriesFiltersUseCase: GetAllCategoriesUseCase,
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
  findAll(@Query() input: GetAllCategoriesHttpDto) {
    return this.findAllCategoriesFiltersUseCase.execute(input);
  }

  @Put(":id")
  updateCategory(@Param("id") id: string, @Body() data: CreateCategoryHttpDto) {
    return this.updateCategoryUseCase.execute(id, data);
  }

}