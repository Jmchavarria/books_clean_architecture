import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { CategoriesMapper } from 'src/app/categories/infrastructure/mapper/categories.mapper';
import { AuthorsMapper } from 'src/app/authors/infrastructure/mapper/authors.mapper';
import type { BooksOrmEntity } from '../persistence/entities/books.orm-entity';
import type {
  ItoAuthorsResponse,
  ItoCategoriesResponse,
} from '../../domain/interfaces/books.interface';

export class BookMapper {
  static toDomain(entity: BooksOrmEntity): BooksDE {
    return new BooksDE({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      language: entity.language,
      format: entity.format,
      publishedYear: entity.publishedYear,
      status: entity.status,
      pages: entity.pages,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      author: AuthorsMapper.toAuthorsSummary(entity.author),
      category: CategoriesMapper.toBooksResponse(entity.category),
    });
  }

  static toCategoriesResponse(entity: BooksOrmEntity): ItoCategoriesResponse {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      language: entity.language,
      format: entity.format,
      status: entity.status,
      pages: entity.pages,
      author: AuthorsMapper.toAuthorsSummary(entity.author),
      publishedYear: entity.publishedYear,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toauthorsResponse(entity: BooksOrmEntity): ItoAuthorsResponse {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      format: entity.format,
      language: entity.language,
      category: entity.category,
      status: entity.status,
      pages: entity.pages,
      publishedYear: entity.publishedYear,
    };
  }
}
