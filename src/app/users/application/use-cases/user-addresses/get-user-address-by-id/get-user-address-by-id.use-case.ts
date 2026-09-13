import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';
import { UserAddressesDE } from 'src/app/users/domain/entity/user-addresses.domain-entity';
import { UserAddressRepository } from 'src/app/users/domain/repository/users-addresses.repositorty';

@Injectable()
export class GetUserAddressByIdUseCase {
  constructor(private readonly repository: UserAddressRepository) {}

  async execute(id: number): Promise<UserAddressesDE> {
    const result = await this.repository.getById(id);

    if (!result) {
      throw new CustomError({
        code: ErrorCode.user_address_not_found,
        message: 'User address not found',
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: GetUserAddressByIdUseCase.name,
      });
    }
    return result;
  }
}
