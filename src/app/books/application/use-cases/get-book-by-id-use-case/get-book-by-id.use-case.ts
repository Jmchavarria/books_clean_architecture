import { BooksDE } from "src/app/books/domain/entities/book.domain-entity";
import { BookRepository } from "src/app/books/domain/repositories/book.repository";
import Injectable from "src/app/conmon/decorators/injectable";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";

@Injectable()
export class GetBookByIdUseCase {
    constructor(
        private readonly bookrepository: BookRepository) { }

    async execute(id: string): Promise<BooksDE> {

        const book = await this.bookrepository.getBookById(id)

        if (book === null) {
            throw new CustomError(ErrorCode.register_not_found, "Book not found")
        }

        return book
    }

}
