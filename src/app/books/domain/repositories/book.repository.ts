import { Pagination } from "src/app/conmon/pagination/pagination";
import { BooksDE } from "../entities/book.domain-entity";
import { GetAllBooksDto } from "../../application/use-cases/get-all-book-use-case/ge-all-book-filters.dto";

export interface SaveBookParams {
  title: string;
  authorId: string;
  categoryId?: string;
  description?: string;
  pages: number;
  isActive: boolean;
  publishedYear: number;
}



export interface UpdateBookParams extends Partial<SaveBookParams> {
  id: string;
}

export abstract class BookRepository {
  abstract createBook(book: SaveBookParams): Promise<BooksDE>;
  abstract getAllBooks(input: GetAllBooksDto): Promise<Pagination<BooksDE[]>>;
  abstract getBookById(id: string): Promise<BooksDE | null >;
  abstract updateBook(data: UpdateBookParams): Promise<BooksDE>;
  abstract deleteBook(id: string): Promise<void>;
}
