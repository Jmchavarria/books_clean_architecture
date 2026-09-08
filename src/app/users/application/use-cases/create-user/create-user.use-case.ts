import { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import { CreateUserDto } from './create-user.dto';
import { GetUserByEmailUseCase } from '../get-user-by-email/get-user-by-email.use-case';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly repository: UsersRepository,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async execute(input: CreateUserDto): Promise<UsersDE> {
    const userExists = await this.getUserByEmailUseCase.execute(input.email);

    if (userExists) {
      throw new CustomError({
        code: ErrorCode.user_already_exist,
        message: 'User already exist',
        instanceName: CreateUserUseCase.name,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    return this.repository.createUser(input);
  }
}
