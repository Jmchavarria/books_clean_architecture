import { HttpStatus } from '@nestjs/common';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import type { UsersDE } from 'src/users/domain/entity/users.domain-enity';
import { UsersRepository } from 'src/users/domain/repository/users.repository';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(email: string): Promise<UsersDE> {
    const result = await this.repository.getUserByEmail(email);

    if (!result)
      throw new CustomError(
        ErrorCode.register_not_found,
        'User not found',
        HttpStatus.NOT_FOUND,
        GetUserByEmailUseCase.name,
      );

    return result;
  }
}
