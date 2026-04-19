import { AuthorsRepository } from "src/app/authors/domain/repository/authors.repository";
import { CreateAuthorDto } from "./create-author.dto";
import { AuthorsDE } from "src/app/authors/domain/entity/authors.domain-entity";
import Injectable from "src/app/conmon/decorators/injectable";

@Injectable()
export class CreateAuthorUseCase {
    constructor(private readonly authorsRepository: AuthorsRepository) { }

    async execute(data: CreateAuthorDto): Promise<AuthorsDE> {
        return this.authorsRepository.createAuthor(data);
    }
}
