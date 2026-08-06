import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { CategoriesMapper } from 'src/app/categories/infrastructure/mapper/categories.mapper';
import type { IBooksSumary } from '../../domain/interfaces/books-summary.interface';
import { AuthorsMapper } from 'src/app/authors/infrastructure/mapper/authors.mapper';
import type { BooksOrmEntity } from '../persistence/entities/books.orm-entity';

export class BookMapper {
  static toDomain(entity: BooksOrmEntity): BooksDE {
    return new BooksDE({
      createdAt: entity.createdAt,
      description: entity.description,
      id: entity.id,
      isActive: entity.isActive,
      pages: entity.pages,
      publishedYear: entity.publishedYear,
      title: entity.title,
      updatedAt: entity.updatedAt,
      author: AuthorsMapper.toAuthorsSummary(entity.author),
      authorId: entity.authorId,
      category: CategoriesMapper.toDomainBooks(entity.category),
      categoryId: entity.categoryId,
    });
  }

  static toBooksSummary(entity: BooksOrmEntity): IBooksSumary {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      isActive: entity.isActive,
      pages: entity.pages,
      publishedYear: entity.publishedYear,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
