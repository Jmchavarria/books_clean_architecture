import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { BooksDE } from '../entities/book.domain-entity';
import type { GetAllBooksDto } from '../../application/use-cases/get-all-book-use-case/ge-all-book-filters.dto';
import type { CreateBookDto } from '../../application/use-cases/create-book-use-case/create-book.dto';
import type { UpdateBookDto } from '../../application/use-cases/update-book-use-case/update-book.dto';
import type { VerifyBookExistsDto } from '../../application/use-cases/verify-book-exists/verify-book-exists.dto';

export abstract class BookRepository {
  abstract createBook(book: CreateBookDto): Promise<BooksDE>;
  abstract getAllBooks(input: GetAllBooksDto): Promise<Pagination<BooksDE[]>>;
  abstract getBookById(id: number): Promise<BooksDE | null>;
  abstract updateBook(data: UpdateBookDto): Promise<BooksDE | null>;
  abstract verifyBookExists(input: VerifyBookExistsDto): Promise<boolean>;
}
