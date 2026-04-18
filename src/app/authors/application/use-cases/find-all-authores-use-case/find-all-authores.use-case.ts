import { AuthorsDE } from "src/app/authors/domain/entity/authors.entity";
import { AuthorsRepository } from "src/app/authors/domain/repository/authors.repository";
import Injectable from "src/app/conmon/decorators/injectable";
import { FindAllAuthorsDto } from "./find-all-authors.dto";
import { Pagination } from "src/app/conmon/pagination/pagination";

@Injectable()
export class FindAllAuthorsUseCase {
    constructor(private readonly authorsRepository: AuthorsRepository) { }

    async execute(input: FindAllAuthorsDto): Promise<Pagination<AuthorsDE[]>> {
        return this.authorsRepository.finAllAuthors(input);
    }
}
