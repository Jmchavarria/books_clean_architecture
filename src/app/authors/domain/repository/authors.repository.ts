import { Pagination } from "src/app/conmon/pagination/pagination";
import { AuthorsDE } from "../entity/authors.entity";

export interface CreateAuthorParams {
    name: string;
    lastname: string;
    birthdate: Date;
    biography?: string | null;
    countryOfBirth: string;
    literaryGenre?: string | null;
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
    abstract findAuthorById(id: string): Promise<AuthorsDE>
    abstract updateAuthor(): Promise<void>
}
