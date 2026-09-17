import type { Pagination } from 'src/app/common/pagination/pagination';
import type { UserAddressesDE } from '../entity/user-addresses.domain-entity';
import type {
  CreateUserAddressProps,
  GetAllUserAddressesProps,
  UpdateUserAddressesProps,
} from '../entity/user-addresses.props';

export abstract class UserAddressRepository {
  abstract create(input: CreateUserAddressProps): Promise<UserAddressesDE>;
  abstract getAll(input: GetAllUserAddressesProps): Promise<Pagination<UserAddressesDE[]>>;
  abstract update(input: UpdateUserAddressesProps): Promise<UserAddressesDE | null>;
  abstract getById(id: number): Promise<UserAddressesDE | null>;
}
