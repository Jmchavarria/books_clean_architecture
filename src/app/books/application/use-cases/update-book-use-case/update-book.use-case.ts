import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import Injectable from 'src/app/conmon/decorators/injectable';
import { UpdateBookDto } from '../../dto/update-book.dto';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { GetBookByIdUseCase } from '../get-book-by-id-use-case/get-book-by-id.use-case';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute(data: UpdateBookDto): Promise<BooksDE> {
    await this.getBookByIdUseCase.execute(data.id);

    return this.bookRepository.updateBook(data);
  }
}
