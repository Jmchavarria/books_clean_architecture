import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import { GetAllBooksDto } from './ge-all-book.dto';
import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import Injectable from 'src/app/common/decorators/injectable';
import { Pagination } from 'src/app/common/pagination/pagination';

@Injectable()
export class GetAllBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: GetAllBooksDto): Promise<Pagination<BooksDE[]>> {
    return this.bookRepository.getAll(input);
  }
}
