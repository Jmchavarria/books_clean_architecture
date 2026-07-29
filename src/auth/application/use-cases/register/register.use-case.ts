import type { GetUserByEmailUseCase } from 'src/app/users/application/use-cases/get-user-by-username/get-user-by-username.use-case';
import type { RegisterDto } from './register.dto';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';
import type { CreateUserUseCase } from 'src/app/users/application/use-cases/create-user/create-user.use-case';
import { UserRoleEnum } from 'src/app/users/domain/enums/user-role.enum';

export class RegisterUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}
  async execute({ email, confirmPassword, password, firstName, lastName }: RegisterDto) {
    const userExists = await this.getUserByEmailUseCase.execute(email);

    if (userExists)
      throw new CustomError(
        ErrorCode.user_already_exist,
        'User already Exist',
        HttpStatus.BAD_REQUEST,
      );

    if (password !== confirmPassword) {
      throw new CustomError(
        ErrorCode.password_mismatch,
        'Password and confirmation password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.createUserUseCase.execute({
      role: UserRoleEnum.USER,
      email,
      lastName,
      firstName,
      password,
    });
  }
}
