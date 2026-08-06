import { AuthorsDE } from 'src/app/authors/domain/entities/authors.domain-entity';
import { AuthorsRepository } from 'src/app/authors/domain/repositories/authors.repository';
import Injectable from 'src/app/conmon/decorators/injectable';
import { GetAllAuthorsDto } from './get-all-authors.dto';
import { Pagination } from 'src/app/conmon/pagination/pagination';

@Injectable()
export class GetAllAuthorsUseCase {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(input: GetAllAuthorsDto): Promise<Pagination<AuthorsDE[]>> {
    return this.authorsRepository.getAll(input);
  }
}
