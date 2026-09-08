import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(id: number): Promise<UsersDE> {
    const user = await this.repository.getUserById(id);

    if (!user)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: 'user not found',
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: GetUserByIdUseCase.name,
      });
    return user;
  }
}
