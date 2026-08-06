import type { IBooksSumary } from 'src/app/books/domain/interfaces/books-summary.interface';
import type { IAuthors } from '../interfaces/authors.interface';

export class AuthorsDE {
  public id: number;
  public name: string;
  public lastname: string;
  public birthdate: Date;
  public biography: string;
  public countryOfBirth: string;
  public literaryGenre: string;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public books: IBooksSumary[];

  constructor(attributes: IAuthors) {
    Object.assign(this, attributes);
  }
}
