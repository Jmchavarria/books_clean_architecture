import { AuthorsRepository } from 'src/app/authors/domain/repositories/authors.repository';
import { CreateAuthorDto } from './create-author.dto';
import { AuthorsDE } from 'src/app/authors/domain/entities/authors.domain-entity';
import Injectable from 'src/app/common/decorators/injectable';
import { CustomSlugify } from 'src/app/common/utils/custom.slugify.util';

@Injectable()
export class CreateAuthorUseCase {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(input: CreateAuthorDto): Promise<AuthorsDE> {
    const generateSlug = CustomSlugify(`${input.firstName} ${input.lastName}`);
    return this.authorsRepository.create({
      ...input,
      slug: generateSlug,
    });
  }
}
