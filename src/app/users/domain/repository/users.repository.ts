import type { Pagination } from 'src/app/common/pagination/pagination';
import type { CreateUserDto } from '../../application/use-cases/create-user/create-user.dto';
import type { UsersDE } from '../entity/users.domain-enity';
import type { GetAllUsersProps, UpdateUserProps } from '../entity/users.props';

export abstract class UsersRepository {
  abstract getUserByEmail(email: string): Promise<UsersDE | null>;
  abstract createUser(input: CreateUserDto): Promise<UsersDE>;
  abstract getUserById(id: number): Promise<UsersDE | null>;
  abstract getAll(filters: GetAllUsersProps): Promise<Pagination<UsersDE[]>>;
  abstract update(input: UpdateUserProps): Promise<UsersDE | null>;
  abstract changePassword(id: number, newPassword: string): Promise<boolean>;
}
