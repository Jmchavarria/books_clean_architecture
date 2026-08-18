import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from '../domain/repositories/book.repository';
import { CreateBookUseCase } from '../application/use-cases/create-book-use-case/create-book-use-case';
import { GetAllBooksUseCase } from '../application/use-cases/get-all-book-use-case/get-all-book.use-case';
import { GetBookByIdUseCase } from '../application/use-cases/get-book-by-id-use-case/get-book-by-id.use-case';
import { UpdateBookUseCase } from '../application/use-cases/update-book-use-case/update-book.use-case';
import { BooksController } from './http/books.controller';
import { BookRepositoryImpl } from './repositories/books.repostory-impl';
import { CategoryOrmEntity } from 'src/app/categories/infrastructure/persistence/entities/category.orm-entity';
import { AuthorsOrmEntity } from 'src/app/authors/infrastructure/persistence/entities/authors.orm-entity';
import { VerifyBookExistsUseCase } from '../application/use-cases/verify-book-exists/verify-book-exists.use-case';
import { BooksOrmEntity } from './persistence/entities/books.orm-entity';
import { UploadBookCoverUseCase } from '../application/use-cases/upload-book-cover/upload-book-cover.use-case';
import { CommonModule } from 'src/app/conmon/common.module';
import { CollectionsOrmEntity } from './persistence/entities/collections.orm-entity';
import { PublishersOrmEntity } from './persistence/entities/publishers.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BooksOrmEntity,
      CategoryOrmEntity,
      AuthorsOrmEntity,
      CollectionsOrmEntity,
      PublishersOrmEntity,
    ]),
    CommonModule,
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
    VerifyBookExistsUseCase,
    UploadBookCoverUseCase,
  ],
  exports: [BookRepository, GetBookByIdUseCase],
})
export class BooksModule {}
