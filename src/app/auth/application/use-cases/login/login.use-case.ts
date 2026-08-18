import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserUseCase } from '../validate-user/validate-user.use-case';
import { CreateRefreshTokenUseCase } from '../refresh-token/create-refresh-token/create-refresh-token.use-cae';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginDto) {
    const user = await this.validateUserUseCase.execute(input);

    const payload = {
      sub: user.id,
      email: user.email,
      fullName: `${user.name} ${user.lastname}`,
      role: user.role,
    };

    const refreshToken = await this.createRefreshTokenUseCase.execute(user.id);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }
}
