import type { UserAddressRepository } from '../../domain/repository/users-addresses.repositorty';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddressOrmEntity } from '../persistence/entities/users-address.orm-entity';
import { UserAddressesDE } from '../../domain/entity/user-addresses.domain-entity';
import {
  CreateUserAddressProps,
  GetAllUserAddressesProps,
  UpdateUserAddressesProps,
} from '../../domain/entity/user-addresses.props';
import { UserAddressesMapper } from '../mapper/user-addresses.mapper';
import { DataSource } from 'typeorm';
import { Pagination } from 'src/app/common/pagination/pagination';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

export class UserAddressesRepositoryImpl implements UserAddressRepository {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(UserAddressOrmEntity)
    private readonly repository: Repository<UserAddressOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(input: CreateUserAddressProps): Promise<UserAddressesDE> {
    const saved = await this.repository.save(input);

    return UserAddressesMapper.toDomain(saved);
  }

  async update(input: UpdateUserAddressesProps): Promise<UserAddressesDE | null> {
    return this.dataSource.transaction(async (manager) => {
      const addressRepo = manager.getRepository(UserAddressOrmEntity);

      // 1. Si la dirección que se está actualizando viene con isDefault: true, Desmarcamos la dirección predeterminada anterior del usuario
      if (input.isDefault) {
        await addressRepo.update({ userId: input.userId, isDefault: true }, { isDefault: false });
      }

      await addressRepo.update(input.id, { ...input });

      const existAddress = await addressRepo.findOneBy({ id: input.id });

      return existAddress !== null ? UserAddressesMapper.toDomain(existAddress) : null;
    });
  }

  async getById(id: number): Promise<UserAddressesDE | null> {
    const result = await this.repository.findOneBy({ id });

    return result !== null ? UserAddressesMapper.toDomain(result) : null;
  }

  async getAll(input: GetAllUserAddressesProps): Promise<Pagination<UserAddressesDE[]>> {
    const { userId, search, pageQuery = 1, takeQuery = 5 } = input;

    const cacheKey = `user:${userId}:addresses:page:${pageQuery}:limit:${takeQuery}:search:${search || 'none'}`;

    const cachedData = await this.cacheManager.get<Pagination<UserAddressesDE[]>>(cacheKey);

    if (cachedData !== undefined) {
      return cachedData;
    }

    const query = this.repository.createQueryBuilder('userAddresses');

    const skip = (pageQuery - 1) * takeQuery;

    for (const [field, value] of Object.entries({ userId })) {
      if (value !== undefined) {
        query.andWhere(`userAddresses.${field} = :${field} `, { [field]: value });
      }
    }

    if (search) {
      query.andWhere(
        `(
      
      userAddresses.alias ILIKE :search OR
      userAddresses.city ILIKE :search OR
      userAddresses.apartmentOrSuite ILIKE :search 
      
      )`,
        { search: `%${search}%` },
      );
    }

    const data = await query
      .orderBy('userAddresses.createdAt', 'DESC')
      .skip(skip)
      .take(takeQuery)
      .getMany();

    const count = await query.getCount();

    const result = new Pagination(
      data.map((entity) => UserAddressesMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );

    await this.cacheManager.set(cacheKey, result, 60_000);

    return result;
  }
}
