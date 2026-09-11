import type { CategoryOrmEntity } from '../persistence/entities/category.orm-entity';
import { CategoryDE } from '../../domain/enitities/category.domain-entity';
import { BookMapper } from 'src/app/books/infrastructure/mappers/book.mapper';
import type { ICategorySummary, toBooksresponse } from '../../domain/interfaces/category.interface';

export class CategoriesMapper {
  static toDomain(entity: CategoryOrmEntity): CategoryDE {
    return new CategoryDE({
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      status: entity.status,
      books: (entity.books || []).map((book) => BookMapper.toCategoriesResponse(book)),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toBooksResponse(entity: CategoryOrmEntity): toBooksresponse {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      slug: entity.slug,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: CategoryOrmEntity): ICategorySummary {
    return {
      id: entity.id,
      name: entity.name,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
