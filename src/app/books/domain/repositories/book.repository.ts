import { Pagination } from "src/app/conmon/pagination/pagination";
import { BooksDE } from "../entities/book.entity";

export interface SaveBookParams {
  title: string;
  authorId: string;
  categoryId?: string ;
  description?: string ;
  pages: number;
  isActive: boolean;
  publishedYear: number;
}

export interface FindBooksFilters {
  pageQuery?: number;
  takeQuery?: number;
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
}

export interface UpdateBookParams extends Partial<SaveBookParams> {
  id: string;
}

export abstract class BookRepository {
  abstract save(book: SaveBookParams): Promise<BooksDE>;
  abstract getAll(filters: FindBooksFilters): Promise<Pagination<BooksDE[]>>;
  abstract findById(id: string): Promise<BooksDE>;
  abstract update(data: UpdateBookParams): Promise<BooksDE>;
  abstract delete(id: string): Promise<void>;
}
