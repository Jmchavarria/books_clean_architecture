import { UsersDE } from '../../domain/entity/users.domain-enity';
import type { UsersOrmEntity } from '../persistence/entities/users.orm-entity';

export class UsersMapper {
  static toDomain(entity: UsersOrmEntity): UsersDE {
    return new UsersDE(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.email,
      entity.password,
      entity.role,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }
}
