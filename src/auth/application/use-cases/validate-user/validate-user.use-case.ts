import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import { LoginDto } from '../login/login.dto';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute({ email, password }: LoginDto) {
    const user = await this.repository.getUserByEmail(email);

    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
