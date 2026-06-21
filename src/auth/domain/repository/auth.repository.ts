import type { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';

export abstract class AuthRepository {
  abstract validateUser(username: string, pass: string): Promise<UsersDE | null>;
}
