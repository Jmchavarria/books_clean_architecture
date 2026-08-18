import { GetUserByEmailUseCase } from 'src/app/users/application/use-cases/get-user-by-email/get-user-by-email.use-case';
import type { RegisterDto } from './register.dto';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/users/application/use-cases/create-user/create-user.use-case';
import { UserRoleEnum } from 'src/app/users/domain/enums/user-role.enum';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CreateRefreshTokenUseCase } from '../refresh-token/create-refresh-token/create-refresh-token.use-cae';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createRefreshTokenUseCase: CreateRefreshTokenUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async execute(input: RegisterDto) {
    const userExists = await this.getUserByEmailUseCase.execute(input.email);

    if (userExists)
      throw new CustomError({
        code: ErrorCode.user_already_exist,
        message: 'User already Exist',
        statusCode: HttpStatus.BAD_REQUEST,
        instanceName: RegisterUseCase.name,
      });

    const user = await this.createUserUseCase.execute({
      ...input,
      role: UserRoleEnum.USER,
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const refreshToken = await this.createRefreshTokenUseCase.execute(user.id);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }
}
