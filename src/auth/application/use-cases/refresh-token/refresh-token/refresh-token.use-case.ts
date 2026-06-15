import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../../../../domain/repository/refresh-token.repository';
import { UsersRepository } from '../../../../../users/domain/repository/users.repository';
import { CreateRefreshTokenUseCase } from '../create-refresh-token/create-refresh-token.use-cae';
import { RefreshTokenDto } from './refresh-token.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly usersRepository: UsersRepository,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
  ) {}

  async execute(input: RefreshTokenDto) {
    const stored = await this.refreshTokenRepository.findByToken(input.refreshToken);

    if (!stored) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (stored.expiresAt < new Date()) {
      await this.refreshTokenRepository.deleteByToken(input.refreshToken);
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.usersRepository.getUserById(stored.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Rotación: borra el viejo y crea uno nuevo
    await this.refreshTokenRepository.deleteByToken(input.refreshToken);
    const newRefreshToken = await this.createRefreshTokenUseCase.execute(user.id);

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
