import { Repository } from 'typeorm';
import { UsersOrmEntity } from '../persistence/entities/users.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersMapper } from '../mapper/users.mapper';
import * as bcrypt from 'bcrypt';
import { UsersDE } from '../../domain/entity/users.domain-enity';
import { CreateUserDto } from '../../application/use-cases/create-user/create-user.dto';
import { UsersRepository } from '../../domain/repository/users.repository';
import { Pagination } from 'src/app/conmon/pagination/pagination';
import { GetAllUsersProps, UpdateUserProps } from '../../domain/entity/users.props';

export class UsersImplRepository implements UsersRepository {
  constructor(
    @InjectRepository(UsersOrmEntity)
    private readonly repository: Repository<UsersOrmEntity>,
  ) {}

  async changePassword(id: number, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await this.repository.update(id, { password: hashedPassword });

    return result.affected === 1;
  }

  async update(input: UpdateUserProps): Promise<UsersDE | null> {
    await this.repository.update(input.id, { ...input });

    const existsUser = await this.repository.findOneBy({ id: input.id });

    return existsUser !== null ? UsersMapper.toDomain(existsUser) : null;
  }

  async getAll(input: GetAllUsersProps): Promise<Pagination<UsersDE[]>> {
    const { search, status, pageQuery = 1, takeQuery = 10 } = input;

    const query = this.repository.createQueryBuilder('users');

    for (const [field, value] of Object.entries({ status })) {
      if (value !== undefined) {
        query.andWhere(`users.${field} = : ${field} `, { [field]: value });
      }
    }
    const skip = (pageQuery - 1) * takeQuery;

    if (search?.trim()) {
      query.andWhere(
        `(
       CONCAT_WS(' ', users.firstName, users.lastName) ILIKE :search,
        )`,
        {
          search: `%${search}%`,
        },
      );
    }

    const data = await query
      .orderBy('users.createdAt', 'DESC')
      .skip(skip)
      .take(takeQuery)
      .getMany();

    const count = await query.getCount();

    return new Pagination(
      data.map((entity) => UsersMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

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
    return UsersMapper.toDomain(saved);
  }
}
