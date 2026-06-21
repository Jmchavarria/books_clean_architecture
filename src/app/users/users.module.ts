import { Module } from '@nestjs/common';
import { UsersRepository } from './domain/repository/users.repository';
import { UsersImplRepository } from './infrastructure/repositories/users.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersOrmEntity } from './infrastructure/persistence/entities/users.orm-entity';
import { UsersController } from './infrastructure/http/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user/create-user.use-case';
import { GetUserByEmailUseCase } from './application/use-cases/get-user-by-username/get-user-by-username.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UsersOrmEntity])],
  controllers: [UsersController],

  providers: [
    CreateUserUseCase,
    GetUserByEmailUseCase,
    {
      provide: UsersRepository,
      useClass: UsersImplRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
