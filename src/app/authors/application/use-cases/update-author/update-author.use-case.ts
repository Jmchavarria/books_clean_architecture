import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthorsRepository } from 'src/app/authors/domain/repository/authors.repository';
import { AuthorsDE } from 'src/app/authors/domain/entity/authors.domain-entity';
import { UpdateAuthorDto } from './update-author.dto';
import { GetAuthorByidUseCase } from '../get-author-by-id/get-author-by-id.use-case';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';

@Injectable()
export class UpdateAuthorUseCase {
  constructor(
    private readonly repository: AuthorsRepository,
    private readonly getAuthorByidUseCase: GetAuthorByidUseCase,
  ) {}

  async execute(input: UpdateAuthorDto): Promise<AuthorsDE> {
    await this.getAuthorByidUseCase.execute(input.id);

    const updateAuthor = await this.repository.updateAuthor(input);

    if (!updateAuthor)
      throw new CustomError({
        code: ErrorCode.update_record_failed,
        message: 'Error attempting to update the register',
        statusCode: HttpStatus.BAD_REQUEST,
        instanceName: AuthorsRepository.name,
      });

    return updateAuthor;
  }
}
