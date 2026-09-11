import { Module } from '@nestjs/common';
import { UsersRepository } from '../domain/repository/users.repository';
import { UsersImplRepository } from './repositories/users.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersOrmEntity } from './persistence/entities/users.orm-entity';
import { UsersController } from './http/users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { GetUserExistsUseCase } from '../application/use-cases/get-user-by-email/get-user-by-email.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { UserAddressOrmEntity } from './persistence/entities/users-address.orm-entity';
import { GetAllUsersUseCase } from '../application/use-cases/get-all-users/get-all-users.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user/update-user.use-case';
import { ChangePasswordUseCase } from '../application/use-cases/change-password/change-password.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsersOrmEntity, UserAddressOrmEntity])],
  controllers: [UsersController],

  providers: [
    CreateUserUseCase,
    GetUserExistsUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    ChangePasswordUseCase,
    {
      provide: UsersRepository,
      useClass: UsersImplRepository,
    },
  ],
  exports: [UsersRepository, GetUserExistsUseCase, CreateUserUseCase],
})
export class UsersModule {}
