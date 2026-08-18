import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RefreshTokenRepository } from 'src/app/auth/domain/repository/refresh-token.repository';

@Injectable()
export class CreateRefreshTokenUseCase {
  constructor(private readonly repository: RefreshTokenRepository) {}

  async execute(userId: number): Promise<string> {
    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.repository.create(userId, token, expiresAt);

    return token;
  }
}
