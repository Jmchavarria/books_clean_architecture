import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersRepository.getUserByEmail(username);

    if (user?.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
