import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { CategoriesMapper } from 'src/app/categories/infrastructure/mapper/categories.mapper';
import type { IBooksSumary } from '../../domain/interfaces/books-summary.interface';
import { AuthorsMapper } from 'src/app/authors/infrastructure/mapper/authors.mapper';
import type { BooksOrmEntity } from '../persistence/entities/books.orm-entity';

export class BookMapper {
  static toDomain(entity: BooksOrmEntity): BooksDE {
    return new BooksDE({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      publishedYear: entity.publishedYear,
      isActive: entity.isActive,
      pages: entity.pages,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      author: AuthorsMapper.toAuthorsSummary(entity.author),
      category: CategoriesMapper.toSummary(entity.category),
    });
  }

  static toBooksSummary(entity: BooksOrmEntity): IBooksSumary {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      isActive: entity.isActive,
      pages: entity.pages,
      category: CategoriesMapper.toSummary(entity.category),
      author: AuthorsMapper.toAuthorsSummary(entity.author),
      publishedYear: entity.publishedYear,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
