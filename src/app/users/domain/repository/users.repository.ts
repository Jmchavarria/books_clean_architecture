import type { CreateUserDto } from '../../application/use-cases/create-user/create-user.dto';
import type { UsersDE } from '../entity/users.domain-enity';

export abstract class UsersRepository {
  abstract getUserByEmail(email: string): Promise<UsersDE | null>;
  abstract createUser(input: CreateUserDto): Promise<UsersDE>;
  abstract getUserById(id: number): Promise<UsersDE | null>;
}
