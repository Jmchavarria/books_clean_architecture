import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { CreateBookDto } from './create-book.dto';
import { VerifyBookExistsUseCase } from '../verify-book-exists/verify-book-exists.use-case';
import { HttpStatus } from '@nestjs/common';
import Injectable from 'src/app/common/decorators/injectable';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';
import { CustomSlugify } from 'src/app/common/utils/custom.slugify.util';

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

      const generateSlug = CustomSlugify(input.title);
      return this.bookRepository.create({
        ...input,
        slug: generateSlug,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
