import type { UserAddressesDE } from '../entity/user-addresses.domain-entity';
import type {
  CreateUserAddressProps,
  UpdateUserAddressesProps,
} from '../entity/user-addresses.props';

export abstract class UserAddressRepository {
  abstract create(input: CreateUserAddressProps): Promise<UserAddressesDE>;
  abstract update(input: UpdateUserAddressesProps): Promise<UserAddressesDE | null>;
  abstract getById(id: number): Promise<UserAddressesDE | null>;
}
