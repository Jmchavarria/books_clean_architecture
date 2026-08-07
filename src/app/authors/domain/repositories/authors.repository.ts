import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { AuthorsDE } from '../entities/authors.domain-entity';
import type {
  CreateAuthorProps,
  GetAllAuthorsProps,
  UpdateAuthorsProps,
} from '../entities/authors.props';

export abstract class AuthorsRepository {
  abstract create(input: CreateAuthorProps): Promise<AuthorsDE>;
  abstract getAll(input: GetAllAuthorsProps): Promise<Pagination<AuthorsDE[]>>;
  abstract getbyId(id: number): Promise<AuthorsDE | null>;
  abstract update(input: UpdateAuthorsProps): Promise<AuthorsDE | null>;
}
