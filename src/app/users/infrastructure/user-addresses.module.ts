import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressOrmEntity } from './persistence/entities/users-address.orm-entity';
import { CreateUserAddressUseCase } from '../application/use-cases/user-addresses/create-user-address/create-user-address.use-case';
import { GetUserAddressByIdUseCase } from '../application/use-cases/user-addresses/get-user-address-by-id/get-user-address-by-id.use-case';
import { UpdateUserAddressUseCase } from '../application/use-cases/user-addresses/update-user-address/update-user-address.use-case';
import { UserAddressRepository } from '../domain/repository/users-addresses.repositorty';
import { UserAddressesRepositoryImpl } from './repositories/user-addresses.repository-impl';
import { UserAddressesController } from './http/user-addresses.controller';
import { GetAllUserAddressesUseCase } from '../application/use-cases/user-addresses/get-all-user-addresses/get-all-user-addresses.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddressOrmEntity])],
  controllers: [UserAddressesController],

  providers: [
    CreateUserAddressUseCase,
    GetUserAddressByIdUseCase,
    UpdateUserAddressUseCase,
    GetAllUserAddressesUseCase,
    {
      provide: UserAddressRepository,
      useClass: UserAddressesRepositoryImpl,
    },
  ],
  exports: [],
})
export class UserAddressesModule {}
