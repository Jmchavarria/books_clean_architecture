import { BookMapper } from 'src/app/books/infrastructure/mappers/book.mapper';
import { AuthorsDE } from '../../domain/entity/authors.domain-entity';
import type { AuthorsOrmEntity } from '../persistence/entities/authors.orm-entity';
import type { IAuthorsSummary } from '../../domain/interfaces/authors-summary.interface';

export class AuthorsMapper {
  static toDomain(author: AuthorsOrmEntity): AuthorsDE {
    return new AuthorsDE({
      id: author.id,
      name: author.name,
      lastName: author.lastName,
      biography: author.biography,
      birthdate: author.birthdate,
      countryOfBirth: author.countryOfBirth,
      createdAt: author.createdAt,
      updatedAt: author.createdAt,
      literaryGenre: author.literaryGenre,
      books: author.books.map((books) => BookMapper.toDomain(books)),
    });
  }

  static toAuthorsSummary(author: AuthorsOrmEntity): IAuthorsSummary {
    return {
      name: author.name,
      biography: author.biography,
      birthdate: author.birthdate,
      countryOfBirth: author.countryOfBirth,
      createdAt: author.createdAt,
      lastName: author.lastName,
      literaryGenre: author.literaryGenre,
    };
  }
}
