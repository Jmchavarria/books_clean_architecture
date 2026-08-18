import type { IBooksSumary } from 'src/app/books/domain/interfaces/books-summary.interface';

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
  books: IBooksSumary[];
}
