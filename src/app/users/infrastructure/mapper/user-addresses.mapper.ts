import { UserAddressesDE } from '../../domain/entity/user-addresses.domain-entity';
import type { UserAddressOrmEntity } from '../persistence/entities/users-address.orm-entity';

export class UserAddressesMapper {
  static toDomain(author: UserAddressOrmEntity): UserAddressesDE {
    return new UserAddressesDE({
      id: author.id,
      userId: author.userId,
      alias: author.alias,
      city: author.city,
      country: author.country,
      state: author.state,
      streetAddress: author.streetAddress,
      postalCode: author.postalCode,
      createdAt: author.createdAt,
      updatedAt: author.createdAt,
    });
  }
}
