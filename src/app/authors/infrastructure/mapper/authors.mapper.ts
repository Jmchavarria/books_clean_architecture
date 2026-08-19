import { BookMapper } from 'src/app/books/infrastructure/mappers/book.mapper';
import { AuthorsDE } from '../../domain/entities/authors.domain-entity';
import type { AuthorsOrmEntity } from '../persistence/entities/authors.orm-entity';
import type { IAuthorsSummary } from '../../domain/interfaces/authors-summary.interface';

export class AuthorsMapper {
  static toDomain(author: AuthorsOrmEntity): AuthorsDE {
    return new AuthorsDE({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      slug: author.slug,
      birthdate: author.birthdate,
      deathdate: author.deathdate,
      biography: author.biography,
      countryOfBirth: author.countryOfBirth,
      photoUrl: author.photoUrl,
      isActive: author.isActive,
      createdAt: author.createdAt,
      updatedAt: author.createdAt,
      genres: author.genres,
      books: author.books.map((books) => BookMapper.toBooksSummary(books)),
    });
  }

  static toAuthorsSummary(author: AuthorsOrmEntity): IAuthorsSummary {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      biography: author.biography,
      birthdate: author.birthdate,
      countryOfBirth: author.countryOfBirth,
      genres: author.genres,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    };
  }
}
