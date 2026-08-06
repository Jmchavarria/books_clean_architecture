import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category/create-category.use-case';
import { GetAllCategoriesUseCase } from '../../application/use-cases/get-all-categories/get-all-categories.use-case';
import { GetCategoryByIdUseCase } from '../../application/use-cases/get-category-by-id/get-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../../application/use-cases/update-category/update-category.use-case';
import { CreateCategoryHttpDto } from './dto/create-category-http-dto';
import { GetAllCategoriesHttpDto } from './dto/get-all-categories-http-dto';
import { UpdateCategoryHttpDto } from './dto/update-category.http-dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoriesFiltersUseCase: GetAllCategoriesUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Post()
  create(@Body() data: CreateCategoryHttpDto) {
    return this.createCategoryUseCase.execute(data);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.getCategoryByIdUseCase.execute(id);
  }

  @Get()
  getAll(@Query() input: GetAllCategoriesHttpDto) {
    return this.findAllCategoriesFiltersUseCase.execute(input);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() input: UpdateCategoryHttpDto) {
    return this.updateCategoryUseCase.execute({
      id,
      ...input,
    });
  }
}
