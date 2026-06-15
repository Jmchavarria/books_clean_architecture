import type { UsersRepository } from 'src/users/domain/repository/users.repository';
import { Repository } from 'typeorm';
import { UsersOrmEntity } from '../persistence/entities/users.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersDE } from 'src/users/domain/entity/users.domain-enity';
import { UsersMapper } from '../mapper/users.mapper';
import { CreateUserDto } from 'src/users/application/use-cases/create-user/create-user.dto';
import * as bcrypt from 'bcrypt';

export class UsersImplRepository implements UsersRepository {
  constructor(
    @InjectRepository(UsersOrmEntity)
    private readonly repository: Repository<UsersOrmEntity>,
  ) {}

  async getUserByEmail(email: string): Promise<UsersDE | null> {
    const user = await this.repository.findOneBy({ email });
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
    return UsersMapper.toDomain(saved);
  }
}
