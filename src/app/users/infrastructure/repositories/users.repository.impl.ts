import { Repository } from 'typeorm';
import { UsersOrmEntity } from '../persistence/entities/users.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersMapper } from '../mapper/users.mapper';
import * as bcrypt from 'bcrypt';
import { UsersDE } from '../../domain/entity/users.domain-enity';
import { CreateUserDto } from '../../application/use-cases/create-user/create-user.dto';
import { UsersRepository } from '../../domain/repository/users.repository';

export class UsersImplRepository implements UsersRepository {
  constructor(
    @InjectRepository(UsersOrmEntity)
    private readonly repository: Repository<UsersOrmEntity>,
  ) {}

  includeAll<T extends object>(repository: Repository<T>): Array<keyof T> {
    return repository.metadata.columns.map((col) => col.propertyName) as Array<keyof T>;
  }
  async getUserByEmail(email: string): Promise<UsersDE | null> {
    const user = await this.repository.findOne({
      where: { email },
      select: this.includeAll(this.repository),
    });
    return user !== null ? UsersMapper.toDomain(user) : null;
  }

  async getUserById(id: number): Promise<UsersDE | null> {
    const user = await this.repository.findOneBy({ id });
    return user !== null ? UsersMapper.toDomain(user) : null;
  }

  async createUser(input: CreateUserDto): Promise<UsersDE> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const saved = await this.repository.save({
      ...input,
      password: hashedPassword,
    });
    const domain = UsersMapper.toDomain(saved);
    return domain;
  }
}
