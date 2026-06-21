import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { AuthorsDE } from '../entity/authors.domain-entity';
import type { UpdateAuthorDto } from '../../application/use-cases/update-author/update-author.dto';
import type { CreateAuthorDto } from '../../application/use-cases/create-author/create-author.dto';
import type { FindAllAuthorsDto } from '../../application/use-cases/get-all-authors/get-all-authors.dto';

export abstract class AuthorsRepository {
  abstract createAuthor(input: CreateAuthorDto): Promise<AuthorsDE>;
  abstract getAllAuthors(input: FindAllAuthorsDto): Promise<Pagination<AuthorsDE[]>>;
  abstract getAuthorById(id: number): Promise<AuthorsDE | null>;
  abstract updateAuthor(input: UpdateAuthorDto): Promise<AuthorsDE>;
}
