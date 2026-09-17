import { UserAddressesDE } from '../../domain/entity/user-addresses.domain-entity';
import type { UserAddressOrmEntity } from '../persistence/entities/users-address.orm-entity';

export class UserAddressesMapper {
  static toDomain(address: UserAddressOrmEntity): UserAddressesDE {
    return new UserAddressesDE({
      id: address.id,
      userId: address.userId,
      alias: address.alias,
      city: address.city,
      country: address.country,
      state: address.state,
      apartmentOrSuite: address.apartmentOrSuite,
      streetAddress: address.streetAddress,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
      createdAt: address.createdAt,
      updatedAt: address.createdAt,
    });
  }
}
