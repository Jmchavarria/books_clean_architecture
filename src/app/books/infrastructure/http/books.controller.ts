import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateBookUseCase } from "../../application/use-cases/create-book-use-case/create-book-use-case";
import { GetAllBooksUseCase } from "../../application/use-cases/get-all-book-use-case/get-all-book.use-case";
import { GetBookByIdUseCase } from "../../application/use-cases/get-book-by-id-use-case/get-book-by-id.use-case";
import { CreateBookHttpDto } from "./dto/create-book.http-dto";
import { GetAllBooksHttpDto } from "./dto/get-all-books.dto";

@Controller("books")
export class BooksController {
  constructor(
    private readonly createBook: CreateBookUseCase,
    private readonly getAllBooksUseCase: GetAllBooksUseCase,
    private readonly getBookById: GetBookByIdUseCase,
  ) {}

  @Get()
  getAll(@Query() filters: GetAllBooksHttpDto) {
    return this.getAllBooksUseCase.execute(filters);
  }

  @Post()
  create(@Body() input : CreateBookHttpDto) {
    return this.createBook.execute(input);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getBookById.execute(id);
  }
}
