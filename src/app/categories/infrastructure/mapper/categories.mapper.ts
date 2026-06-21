import type { CategoryOrmEntity } from '../persistence/entities/category.orm-entity';
import { CategoryDE } from '../../domain/enitities/category.domain-entity';
import { BookMapper } from 'src/app/books/infrastructure/mappers/book.mapper';
import type { ICategorySummary } from '../../domain/interfaces/category-summary.interface';

export class CategoriesMapper {
  static toDomain(entity: CategoryOrmEntity): CategoryDE {
    return new CategoryDE(
      entity.id,
      entity.name,
      entity.isActive,
      entity.books.map((book) => BookMapper.toBooksSummary(book)),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toDomainBooks(entity: CategoryOrmEntity): ICategorySummary {
    return {
      id: entity.id,
      name: entity.name,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
