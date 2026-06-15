import type { CategoryOrmEntity } from '../persistence/entities/category.orm-entity';
import { CategoryDE } from '../../domain/enitities/category.domain-entity';

export class CategoriesMapper {
  static toDomain(entity: CategoryOrmEntity): CategoryDE {
    return new CategoryDE(
      entity.id,
      entity.name,
      entity.isActive,
      entity.books,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
