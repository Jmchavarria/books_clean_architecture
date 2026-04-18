import { BookRepository } from "src/app/books/domain/repositories/book.repository";
import Injectable from "src/app/conmon/decorators/injectable";

@Injectable()
export class GetBookByIdUseCase {
    constructor(
        private readonly bookrepository: BookRepository) { }

    async execute(id: string) {
        return this.bookrepository.findById(id)
    }
}
