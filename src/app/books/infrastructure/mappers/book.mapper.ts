import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import type { BookOrmEntity } from '../persistence/entities/book.orm-entity';
import { CategoriesMapper } from 'src/app/categories/infrastructure/mapper/categories.mapper';
import type { IBooksSumary } from '../../domain/interface/books-summary.interface';

export class BookMapper {
  static toDomain(entity: BookOrmEntity): BooksDE {
    return new BooksDE(
      entity.id,
      entity.title,
      entity.authorId,
      entity.categoryId,
      CategoriesMapper.toDomainBooks(entity.category),
      entity.description,
      entity.author,
      entity.pages,
      entity.isActive,
      entity.publishedYear,
      entity.createdAt,
      entity.updatedAt,
    );
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
