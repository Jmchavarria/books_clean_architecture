import { UserAddressRepository } from 'src/app/users/domain/repository/users-addresses.repositorty';
import { UpdateUserAddressDto } from './update-user-address.dto';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { GetUserAddressByIdUseCase } from '../get-user-address-by-id/get-user-address-by-id.use-case';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserUseCase } from '../../update-user/update-user.use-case';
import { UserAddressesDE } from 'src/app/users/domain/entity/user-addresses.domain-entity';

@Injectable()
export class UpdateUserAddressUseCase {
  constructor(
    private readonly repository: UserAddressRepository,

    private readonly getUserAddressByIdUseCase: GetUserAddressByIdUseCase,
  ) {}

  async execute(input: UpdateUserAddressDto): Promise<UserAddressesDE> {
    await this.getUserAddressByIdUseCase.execute(input.id);

    const addressUpdated = await this.repository.update(input);

    if (addressUpdated === null)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: `Address with ID ${input.id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: UpdateUserUseCase.name,
      });

    return addressUpdated;
  }
}
