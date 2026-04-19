import Injectable from "src/app/conmon/decorators/injectable";
import { BookRepository } from "src/app/books/domain/repositories/book.repository";
import { GetAllBooksDto } from "./ge-all-book-filters.dto";
import { Pagination } from "src/app/conmon/pagination/pagination";
import { BooksDE } from "src/app/books/domain/entities/book.domain-entity";

@Injectable()
export class GetAllBooksUseCase {
    constructor(
        private readonly bookRepository: BookRepository
    ) { }

    async execute(input: GetAllBooksDto): Promise<Pagination<BooksDE[]>> {
        return this.bookRepository.getAllBooks(input);
    }
}
