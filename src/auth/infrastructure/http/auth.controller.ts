import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/auth/application/use-cases/login/login.use-case';
import { LogoutUseCase } from 'src/auth/application/use-cases/logout/logout.use-case';
import { RefreshTokenDto } from 'src/auth/application/use-cases/refresh-token/refresh-token/refresh-token.dto';
import { RefreshTokenUseCase } from 'src/auth/application/use-cases/refresh-token/refresh-token/refresh-token.use-case';
import { VerifyTokenOAuthUseCase } from 'src/auth/application/use-cases/verify-token-oauth/verify-token-oauth.use.case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly verifyTokenOAuthUseCase: VerifyTokenOAuthUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.loginUseCase.execute(body.email, body.password);
  }

  @Post('refresh')
  async refresh(@Body() input: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(input);
  }

  @Post('logout')
  async logout(@Body() dto: RefreshTokenDto) {
    await this.logoutUseCase.execute(dto.refreshToken);
    return { message: 'Logged out successfully' };
  }

  @Post('verify-token-google')
  async verifyTokenOAuthGoogle(@Body('token') token: string) {
    return this.verifyTokenOAuthUseCase.execute(token);
  }
}
