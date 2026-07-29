import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import type { BookOrmEntity } from '../persistence/entities/book.orm-entity';
import { CategoriesMapper } from 'src/app/categories/infrastructure/mapper/categories.mapper';
import type { IBooksSumary } from '../../domain/interface/books-summary.interface';
import { AuthorsMapper } from 'src/app/authors/infrastructure/mapper/authors.mapper';

export class BookMapper {
  static toDomain(entity: BookOrmEntity): BooksDE {
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

  static toBooksSummary(entity: BookOrmEntity): IBooksSumary {
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
