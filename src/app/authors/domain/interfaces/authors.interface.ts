import type { IBooksSumary } from 'src/app/books/domain/interfaces/books-summary.interface';
import type { GenresOrmEntity } from 'src/app/genres/infrastructure/persistence/entities/genres.orm-entity';

export interface IAuthors {
  id: number;
  firstName: string;
  lastName?: string;
  slug: string;
  birthdate?: Date;
  deathdate?: Date;
  biography?: string;
  countryOfBirth?: string;
  photoUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // cambiarlo por su respectiva interfaz
  genres: GenresOrmEntity[];
  books: IBooksSumary[];
}
