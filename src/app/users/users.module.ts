import { Module } from '@nestjs/common';
import { UsersRepository } from './domain/repository/users.repository';
import { UsersImplRepository } from './infrastructure/repositories/users.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersOrmEntity } from './infrastructure/persistence/entities/users.orm-entity';
import { UsersController } from './infrastructure/http/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { GetUserByEmailUseCase } from './application/use-cases/get-user-by-username/get-user-by-username.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id/get-user-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsersOrmEntity])],
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
