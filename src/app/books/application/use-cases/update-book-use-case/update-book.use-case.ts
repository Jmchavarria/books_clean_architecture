import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { GetBookByIdUseCase } from '../get-book-by-id-use-case/get-book-by-id.use-case';
import { HttpStatus } from '@nestjs/common';
import Injectable from 'src/app/common/decorators/injectable';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute(input: UpdateBookDto): Promise<BooksDE> {
    await this.getBookByIdUseCase.execute(input.id);

    const updateBook = await this.bookRepository.update(input);

    if (!updateBook)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: `Book with ID ${input.id} not found`,
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: UpdateBookUseCase.name,
      });

    return updateBook;
  }
}
