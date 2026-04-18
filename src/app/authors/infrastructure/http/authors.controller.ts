import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateAuthorUseCase } from "../../application/use-cases/create-author-use-case/create-author.use-case";
import { FindAllAuthorsUseCase } from "../../application/use-cases/find-all-authores-use-case/find-all-authores.use-case";
import { CreateAuthorHttpDto } from "./dto/create-authors-http-dto";
import { FindAllAuthorsHttpDto } from "./dto/find-all-authors-http-dto";

@Controller("authors")
export class AuthorsController {
  constructor(
    private readonly findAllAuthorsUseCase: FindAllAuthorsUseCase,
    private readonly createAuthorUseCase: CreateAuthorUseCase,
  ) {}

  @Get()
  async findAllAuthors(@Query() input: FindAllAuthorsHttpDto) {
    return this.findAllAuthorsUseCase.execute(input);
  }

  @Post()
  async createAuthors(@Body() input: CreateAuthorHttpDto) {
    return this.createAuthorUseCase.execute(input);
  }
}
