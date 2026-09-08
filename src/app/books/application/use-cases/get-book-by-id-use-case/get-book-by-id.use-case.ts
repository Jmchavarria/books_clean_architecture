import { HttpStatus } from '@nestjs/common';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import Injectable from 'src/app/common/decorators/injectable';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class GetBookByIdUseCase {
  constructor(private readonly bookrepository: BookRepository) {}

  async execute(id: number): Promise<BooksDE> {
    const book = await this.bookrepository.getById(id);

    if (!book)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: 'Book not found',
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: GetBookByIdUseCase.name,
      });

    return book;
  }
}
