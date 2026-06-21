import { BookMapper } from 'src/app/books/infrastructure/mappers/book.mapper';
import { AuthorsDE } from '../../domain/entity/authors.domain-entity';
import type { AuthorsOrmEntity } from '../persistence/entities/authors.orm-entity';

export class AuthorsMapper {
  static toDomain(author: AuthorsOrmEntity): AuthorsDE {
    return new AuthorsDE(
      author.id,
      author.name,
      author.lastname,
      author.birthdate,
      author.biography ?? null,
      author.countryOfBirth,
      author.literaryGenre ?? null,
      author.isActive,
      author.createdAt,
      author.updatedAt,
      author.books.map((books) => BookMapper.toBooksSummary(books)),
    );
  }
}
