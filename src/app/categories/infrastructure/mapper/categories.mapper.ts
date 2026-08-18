import type { CategoryOrmEntity } from '../persistence/entities/category.orm-entity';
import { CategoryDE } from '../../domain/enitities/category.domain-entity';
import { BookMapper } from 'src/app/books/infrastructure/mappers/book.mapper';
import type { ICategorySummary } from '../../domain/interfaces/category-summary.interface';

export class CategoriesMapper {
  static toDomain(entity: CategoryOrmEntity): CategoryDE {
    return new CategoryDE({
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      books: entity.books.map((book) => BookMapper.toBooksSummary(book)),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toSummary(entity: CategoryOrmEntity): ICategorySummary {
    return {
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
