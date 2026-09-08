import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import type { UpdateUserDto } from './update-user.dto';
import type { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { GetUserByIdUseCase } from '../get-user-by-id/get-user-by-id.use-case';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly repository: UsersRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(input: UpdateUserDto): Promise<UsersDE> {
    await this.getUserByIdUseCase.execute(input.id);

    const userUpdated = await this.repository.update(input);

    if (userUpdated === null)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: `Book with ID ${input.id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: UpdateUserUseCase.name,
      });

    return userUpdated;
  }
}
