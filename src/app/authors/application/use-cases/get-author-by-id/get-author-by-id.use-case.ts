import { HttpStatus } from '@nestjs/common';
import { AuthorsDE } from 'src/app/authors/domain/entity/authors.domain-entity';
import { AuthorsRepository } from 'src/app/authors/domain/repository/authors.repository';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';

@Injectable()
export class GetAuthorByidUseCase {
  constructor(private readonly repository: AuthorsRepository) {}

  async execute(id: number): Promise<AuthorsDE> {
    const result = await this.repository.getAuthorById(id);

    if (result === null)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: 'Author not found by id ',
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: GetAuthorByidUseCase.name,
      });

    return result;
  }
}
