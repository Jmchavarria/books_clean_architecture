import { BookRepository } from "src/app/books/domain/repositories/book.repository";
import Injectable from "src/app/conmon/decorators/injectable";
import { BooksDE } from "src/app/books/domain/entities/book.entity";
import { CreateBookDto } from "./create-book.dto";

@Injectable()
export class CreateBookUseCase {
    constructor(
        private readonly bookRepository: BookRepository,
    ) { }

    async execute(input: CreateBookDto): Promise<BooksDE> {
        return this.bookRepository.save(input);
    }
}
