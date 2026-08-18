import { RefreshTokenDE } from 'src/app/auth/domain/entities/refresh-token-domain.entity';
import type { RefreshTokenOrmEntity } from '../persitence/entities/refresh-token.orm-entity';

export class RefreshTokenMapper {
  static toDomain(entity: RefreshTokenOrmEntity): RefreshTokenDE {
    return new RefreshTokenDE(
      entity.id,
      entity.userId,
      entity.token,
      entity.expiresAt,
      entity.createdAt,
    );
  }
}
