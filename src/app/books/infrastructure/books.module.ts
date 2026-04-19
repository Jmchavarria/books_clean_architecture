import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookRepository } from "../domain/repositories/book.repository";
import { CreateBookUseCase } from "../application/use-cases/create-book-use-case/create-book-use-case";
import { GetAllBooksUseCase } from "../application/use-cases/get-all-book-use-case/get-all-book.use-case";
import { GetBookByIdUseCase } from "../application/use-cases/get-book-by-id-use-case/get-book-by-id.use-case";
import { UpdateBookUseCase } from "../application/use-cases/update-book-use-case/update-book.use-case";
import { BooksController } from "./http/books.controller";
import { BookRepositoryImpl } from "./repositories/book.repositor.impl";
import { BookOrmEntity } from "./persistence/entities/book.orm-entity";
import { CategoryOrmEntity } from "src/app/categories/infrastructure/persistence/entities/category.orm-entity";
import { AuthorsOrmEntity } from "src/app/authors/infrastructure/persistence/entities/authors.orm-entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BookOrmEntity, CategoryOrmEntity, AuthorsOrmEntity]),
  ],
  controllers: [BooksController],
  providers: [
    {
      provide: BookRepository,
      useClass: BookRepositoryImpl,
    },
    CreateBookUseCase,
    GetBookByIdUseCase,
    UpdateBookUseCase,
    GetAllBooksUseCase,
  ],
  exports: [BookRepository, GetBookByIdUseCase, ],
})
export class BooksModule {}
