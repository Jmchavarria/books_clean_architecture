import { UsersRepository } from 'src/users/domain/repository/users.repository';
import { UsersDE } from 'src/users/domain/entity/users.domain-enity';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(id: number): Promise<UsersDE> {
    const user = await this.repository.getUserById(id);

    if (!user)
      throw new CustomError(
        ErrorCode.register_not_found,
        'user not found',
        HttpStatus.NOT_FOUND,
        GetUserByIdUseCase.name,
      );
    return user;
  }
}
