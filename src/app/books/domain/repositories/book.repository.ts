import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { BooksDE } from '../entities/book.domain-entity';
import type {
  CreateBookProps,
  GetAllBooksProps,
  UpdateBookProps,
  VerifyBookExistsProps,
} from '../entities/books.props';

export abstract class BookRepository {
  abstract create(input: CreateBookProps): Promise<BooksDE>;
  abstract getAll(input: GetAllBooksProps): Promise<Pagination<BooksDE[]>>;
  abstract getById(id: number): Promise<BooksDE | null>;
  abstract update(input: UpdateBookProps): Promise<BooksDE | null>;
  abstract verifyExists(input: VerifyBookExistsProps): Promise<boolean>;
  abstract updateBookCover(): Promise<void>; // cambiar el tipo de respuesta (justamente por la respuesta que devuelve imageKit)
}
