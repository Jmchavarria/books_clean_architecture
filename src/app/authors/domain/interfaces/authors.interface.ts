import type { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';

export interface IAuthors {
  id: number;
  name: string;
  lastName: string;
  biography: string;
  birthdate: Date;
  countryOfBirth: string;
  literaryGenre: string;
  createdAt: Date;
  updatedAt: Date;
  books: BooksDE[];
}
