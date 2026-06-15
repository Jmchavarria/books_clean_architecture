import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category-use-case/create-category.use-case';
import { GetAllCategoriesUseCase } from '../../application/use-cases/find-all-categories-use-case/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from '../../application/use-cases/find-category-by-id/find-category-by-id.use-case';
import { UpdateCategoryUseCase } from '../../application/use-cases/update-category/update-category.use-case';
import { CreateCategoryHttpDto } from './dto/create-category-http-dto';
import { GetAllCategoriesHttpDto } from './dto/get-all-categories-http-dto';
import { UpdateCategoryHttpDto } from './dto/update-category.http-dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoriesFiltersUseCase: GetAllCategoriesUseCase,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Post()
  save(@Body() data: CreateCategoryHttpDto) {
    return this.createCategoryUseCase.execute(data);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.findCategoryByIdUseCase.execute(id);
  }

  @Get()
  findAll(@Query() input: GetAllCategoriesHttpDto) {
    return this.findAllCategoriesFiltersUseCase.execute(input);
  }

  @Put(':id')
  updateCategory(@Param('id') id: number, @Body() input: UpdateCategoryHttpDto) {
    return this.updateCategoryUseCase.execute({
      id,
      ...input,
    });
  }
}
