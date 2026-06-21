// src/auth/application/use-cases/validate-user/validate-user.use-case.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(email: string, password: string) {
    const user = await this.repository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
