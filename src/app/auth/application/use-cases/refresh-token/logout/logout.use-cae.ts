import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from 'src/app/auth/domain/repository/refresh-token.repository';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly repository: RefreshTokenRepository) {}

  async execute(refreshToken: string): Promise<void> {
    await this.repository.deleteByToken(refreshToken);
  }
}
