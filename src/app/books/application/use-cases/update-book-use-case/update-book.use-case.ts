import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import Injectable from 'src/app/conmon/decorators/injectable';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { GetBookByIdUseCase } from '../get-book-by-id-use-case/get-book-by-id.use-case';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute(input: UpdateBookDto): Promise<BooksDE> {
    await this.getBookByIdUseCase.execute(input.id);

    const updateBook = await this.bookRepository.updateBook(input);

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
