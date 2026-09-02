import { UsersRepository } from 'src/app/users/domain/repository/users.repository';
import type { UpdateUserDto } from './update-user.dto';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import type { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';
import Injectable from 'src/app/conmon/decorators/injectable';
import { GetUserByIdUseCase } from '../get-user-by-id/get-user-by-id.use-case';

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
