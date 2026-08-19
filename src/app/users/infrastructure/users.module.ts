import { Module } from '@nestjs/common';
import { UsersRepository } from '../domain/repository/users.repository';
import { UsersImplRepository } from './repositories/users.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersOrmEntity } from './persistence/entities/users.orm-entity';
import { UsersController } from './http/users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { GetUserByEmailUseCase } from '../application/use-cases/get-user-by-email/get-user-by-email.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { UserAddressOrmEntity } from './persistence/entities/users-address.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersOrmEntity, UserAddressOrmEntity])],
  controllers: [UsersController],

  providers: [
    CreateUserUseCase,
    GetUserByEmailUseCase,
    GetUserByIdUseCase,
    {
      provide: UsersRepository,
      useClass: UsersImplRepository,
    },
  ],
  exports: [UsersRepository, GetUserByEmailUseCase, CreateUserUseCase],
})
export class UsersModule {}
