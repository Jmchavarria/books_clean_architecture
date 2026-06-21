import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenDE } from 'src/auth/domain/entities/refresh-token-domain.entity';
import { RefreshTokenRepository } from 'src/auth/domain/repository/refresh-token.repository';
import { Repository } from 'typeorm';
import { RefreshTokenMapper } from '../mapper/refresh-token.mapper';
import { RefreshTokenOrmEntity } from '../persitence/entities/refresh-token.orm-entity';

@Injectable()
export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshTokenOrmEntity)
    private readonly repository: Repository<RefreshTokenOrmEntity>,
  ) {}

  async create(userId: number, token: string, expiresAt: Date): Promise<void> {
    const entity = this.repository.create({ userId, token, expiresAt });
    await this.repository.save(entity);
  }

  async findByToken(token: string): Promise<RefreshTokenDE | null> {
    const entity = await this.repository.findOneBy({ token });
    return entity ? RefreshTokenMapper.toDomain(entity) : null;
  }

  async deleteByToken(token: string): Promise<void> {
    await this.repository.delete({ token });
  }

  async deleteAllByUserId(userId: number): Promise<void> {
    await this.repository.delete({ userId });
  }
}
