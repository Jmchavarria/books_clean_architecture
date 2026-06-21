import type { RefreshTokenDE } from '../entities/refresh-token-domain.entity';

export abstract class RefreshTokenRepository {
  abstract create(userId: number, token: string, expiresAt: Date): Promise<void>;
  abstract findByToken(token: string): Promise<RefreshTokenDE | null>;
  abstract deleteByToken(token: string): Promise<void>;
  abstract deleteAllByUserId(userId: number): Promise<void>;
}
