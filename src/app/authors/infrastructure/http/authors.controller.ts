import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateAuthorUseCase } from '../../application/use-cases/create-author/create-author.use-case';
import { GetAllAuthorsUseCase } from '../../application/use-cases/get-all-authors/get-all-authors.use-case';
import { CreateAuthorHttpDto } from './dto/create-authors-http-dto';
import { FindAllAuthorsHttpDto } from './dto/find-all-authors-http-dto';
import { GetAuthorByidUseCase } from '../../application/use-cases/get-author-by-id/get-author-by-id.use-case';
import { UpdateAuthorUseCase } from '../../application/use-cases/update-author/update-author.use-case';
import { UpdateAuthorHttpDto } from './dto/update-author.http-dto';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly getAllAuthorsUseCase: GetAllAuthorsUseCase,
    private readonly createAuthorUseCase: CreateAuthorUseCase,
    private readonly getAuthorByidUseCase: GetAuthorByidUseCase,
    private readonly updateAuthorUseCase: UpdateAuthorUseCase,
  ) {}

  @Get()
  async getAll(@Query() input: FindAllAuthorsHttpDto) {
    return this.getAllAuthorsUseCase.execute(input);
  }

  @Post()
  async create(@Body() input: CreateAuthorHttpDto) {
    return this.createAuthorUseCase.execute(input);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.getAuthorByidUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() input: UpdateAuthorHttpDto) {
    return this.updateAuthorUseCase.execute({ id, ...input });
  }
}
