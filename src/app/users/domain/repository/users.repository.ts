import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { CreateUserDto } from '../../application/use-cases/create-user/create-user.dto';
import type { UsersDE } from '../entity/users.domain-enity';
import type { GetAllUsersProps } from '../entity/users.props';

export abstract class UsersRepository {
  abstract getUserByEmail(email: string): Promise<UsersDE | null>;
  abstract createUser(input: CreateUserDto): Promise<UsersDE>;
  abstract getUserById(id: number): Promise<UsersDE | null>;
  abstract getAll(input: GetAllUsersProps): Promise<Pagination<UsersDE[]>>;
}
