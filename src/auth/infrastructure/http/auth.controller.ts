import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/auth/application/use-cases/login/login.use-case';
import { LogoutUseCase } from 'src/auth/application/use-cases/logout/logout.use-case';
import { RefreshTokenDto } from 'src/auth/application/use-cases/refresh-token/refresh-token/refresh-token.dto';
import { RefreshTokenUseCase } from 'src/auth/application/use-cases/refresh-token/refresh-token/refresh-token.use-case';
import { VerifyTokenOAuthUseCase } from 'src/auth/application/use-cases/verify-token-oauth/verify-token-oauth.use.case';
import { LoginHttpDto } from './dto/login.http-dto';
import { RegisterUseCase } from 'src/auth/application/use-cases/register/register.use-case';
import { RegisterHttpDto } from './dto/register.http-dto';
import { CreateUserHttpDto } from 'src/app/users/infrastructure/http/dto/create-user.http-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly verifyTokenOAuthUseCase: VerifyTokenOAuthUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() input: LoginHttpDto) {
    return this.loginUseCase.execute(input);
  }

  @Post('refresh')
  async refresh(@Body() input: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(input);
  }

  @Post('logout')
  async logout(@Body() input: RefreshTokenDto) {
    await this.logoutUseCase.execute(input.refreshToken);
    return { message: 'Logged out successfully' };
  }

  @Post('register')
  async register(@Body() input: RegisterHttpDto) {
    await this.registerUseCase.execute(input);
    return { message: 'Logged out successfully' };
  }

  @Post('verify-token-google')
  async verifyTokenOAuthGoogle(@Body('token') token: string) {
    return this.verifyTokenOAuthUseCase.execute(token);
  }
}
