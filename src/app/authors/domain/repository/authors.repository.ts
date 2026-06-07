import { Pagination } from "src/app/conmon/pagination/pagination";
import { AuthorsDE } from "../entity/authors.domain-entity";

export interface CreateAuthorParams {
    name: string;
    lastname: string;
    birthdate: Date;
    biography?: string;
    countryOfBirth: string;
    literaryGenre?: string;
    isActive: boolean;
}

export interface FindAllAuthorsParams {
    pageQuery?: number;
    takeQuery?: number;
    name?: string;
    isActive?: boolean;
    literaryGenre?: string;
}

export abstract class AuthorsRepository {
    abstract createAuthor(input: CreateAuthorParams): Promise<AuthorsDE>
    abstract finAllAuthors(input: FindAllAuthorsParams): Promise<Pagination<AuthorsDE[]>>
    abstract findAuthorById(id: number): Promise<AuthorsDE>
    abstract updateAuthor(): Promise<void>
}
