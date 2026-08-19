import type { GenresOrmEntity } from 'src/app/genres/infrastructure/persistence/entities/genres.orm-entity';

export interface IAuthorsSummary {
  id: number;
  firstName: string;
  lastName?: string;
  biography?: string;
  birthdate?: Date;
  countryOfBirth?: string;
  genres: GenresOrmEntity[];
  createdAt: Date;
  updatedAt: Date;
}
