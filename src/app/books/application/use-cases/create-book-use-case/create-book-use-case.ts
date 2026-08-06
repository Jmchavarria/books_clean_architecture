import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import Injectable from 'src/app/conmon/decorators/injectable';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { CreateBookDto } from './create-book.dto';
import { VerifyBookExistsUseCase } from '../verify-book-exists/verify-book-exists.use-case';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class CreateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly verifyBookExistsUseCase: VerifyBookExistsUseCase,
  ) {}

  async execute(input: CreateBookDto): Promise<BooksDE> {
    try {
      const verifyBookExists = await this.verifyBookExistsUseCase.execute({
        authorId: input.authorId,
        publishedYear: input.publishedYear,
        title: input.title,
      });

      if (verifyBookExists)
        throw new CustomError({
          code: ErrorCode.book_already_exists,
          message: 'The book already exists',
          statusCode: HttpStatus.BAD_REQUEST,
          instanceName: CreateBookUseCase.name,
        });

      return this.bookRepository.create(input);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
