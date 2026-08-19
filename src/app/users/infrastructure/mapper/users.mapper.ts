import { UsersDE } from '../../domain/entity/users.domain-enity';
import type { UsersOrmEntity } from '../persistence/entities/users.orm-entity';

export class UsersMapper {
  static toDomain(entity: UsersOrmEntity): UsersDE {
    return new UsersDE({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      phone: entity.phone,
      avatarUrl: entity.avatarUrl,
      isEmailVerified: entity.isEmailVerified,
      role: entity.role,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      addresses: entity.addresses,
      orders: entity.orders,
      cart: entity.cart,
      reviews: entity.reviews,
    });
  }
}
