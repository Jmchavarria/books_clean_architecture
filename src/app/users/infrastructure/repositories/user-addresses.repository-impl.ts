import type { UserAddressRepository } from '../../domain/repository/users-addresses.repositorty';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddressOrmEntity } from '../persistence/entities/users-address.orm-entity';
import { UserAddressesDE } from '../../domain/entity/user-addresses.domain-entity';
import {
  CreateUserAddressProps,
  UpdateUserAddressesProps,
} from '../../domain/entity/user-addresses.props';
import { UserAddressesMapper } from '../mapper/user-addresses.mapper';

export class UserAddressesRepositoryImpl implements UserAddressRepository {
  constructor(
    @InjectRepository(UserAddressOrmEntity)
    private readonly repository: Repository<UserAddressOrmEntity>,
  ) {}

  async create(input: CreateUserAddressProps): Promise<UserAddressesDE> {
    const saved = await this.repository.save(input);

    return UserAddressesMapper.toDomain(saved);
  }

  async update(input: UpdateUserAddressesProps): Promise<UserAddressesDE | null> {
    await this.repository.update(input.id, { ...input });

    const existAddress = await this.repository.findOneBy({ id: input.id });

    return existAddress !== null ? UserAddressesMapper.toDomain(existAddress) : null;
  }

  async getById(id: number): Promise<UserAddressesDE | null> {
    const result = await this.repository.findOneBy({ id });

    return result !== null ? UserAddressesMapper.toDomain(result) : null;
  }
}
