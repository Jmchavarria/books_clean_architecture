import { BookRepository } from "src/app/books/domain/repositories/book.repository";
import Injectable from "src/app/conmon/decorators/injectable";
import { UpdateBookDto } from "../../dto/update-book.dto";
import { BooksDE } from "src/app/books/domain/entities/book.domain-entity";

@Injectable()
export class UpdateBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository
  ) { }

  async execute(data: UpdateBookDto): Promise<BooksDE> {
    return this.bookRepository.updateBook(data);
  }
}
