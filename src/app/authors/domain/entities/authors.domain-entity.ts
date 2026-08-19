import type { IBooksSumary } from 'src/app/books/domain/interfaces/books-summary.interface';
import type { IAuthors } from '../interfaces/authors.interface';
import type { GenresOrmEntity } from 'src/app/genres/infrastructure/persistence/entities/genres.orm-entity';

export class AuthorsDE {
  public id: number;
  public firstName: string;
  public lastname?: string;
  public slug: string;
  public birthdate: Date;
  public deathdate?: Date;
  public biography: string;
  public countryOfBirth: string;
  public photoUrl?: string;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public books: IBooksSumary[];
  public genres: GenresOrmEntity[];

  constructor(attributes: IAuthors) {
    Object.assign(this, attributes);
  }
}
