import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { AuthorsDE } from '../entities/authors.domain-entity';
import type { CreateAuthorDto } from '../../application/use-cases/create-author/create-author.dto';
import type { GetAllAuthorsProps, UpdateAuthorsProps } from '../entities/authors.props';

export abstract class AuthorsRepository {
  abstract create(input: CreateAuthorDto): Promise<AuthorsDE>;
  abstract getAll(input: GetAllAuthorsProps): Promise<Pagination<AuthorsDE[]>>;
  abstract getbyId(id: number): Promise<AuthorsDE | null>;
  abstract update(input: UpdateAuthorsProps): Promise<AuthorsDE | null>;
}
