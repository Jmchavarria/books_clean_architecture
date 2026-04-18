import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateBookUseCase } from "../../application/use-cases/create-book-use-case/create-book-use-case";
import { DeleteBookUseCase } from "../../application/use-cases/delete-book-use-case/delete-book.use-case";
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
    private readonly deleteBook: DeleteBookUseCase,
  ) {}

  @Get()
  findAll(@Query() filters: GetAllBooksHttpDto) {
    return this.getAllBooksUseCase.execute(filters);
  }

  @Post()
  create(@Body() body: CreateBookHttpDto) {
    return this.createBook.execute(body);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.getBookById.execute(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.deleteBook.execute(id);
  }
}
