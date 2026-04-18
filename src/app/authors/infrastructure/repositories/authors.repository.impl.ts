import { AuthorsOrmEntity } from "../persistence/entities/authors.orm-entity";
import { AuthorsRepository, CreateAuthorParams, FindAllAuthorsParams } from "../../domain/repository/authors.repository";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorsDE } from "../../domain/entity/authors.entity";
import { Pagination } from "src/app/conmon/pagination/pagination";
import Injectable from "src/app/conmon/decorators/injectable";

@Injectable()
export class AuthorsRepositoryImpl implements AuthorsRepository {
    constructor(
        @InjectRepository(AuthorsOrmEntity)
        private readonly repository: Repository<AuthorsOrmEntity>) { }

    async createAuthor(input: CreateAuthorParams): Promise<AuthorsDE> {
        const author = await this.repository.save(input)
        return this.toDomain(author)
    }

    async finAllAuthors(input: FindAllAuthorsParams): Promise<Pagination<AuthorsDE[]>> {

        const { isActive, literaryGenre, name, pageQuery = 1, takeQuery = 10 } = input

        let where: FindOptionsWhere<AuthorsOrmEntity> = {}

        if (typeof isActive === "boolean") where.isActive = isActive
        if (literaryGenre) where.literaryGenre = literaryGenre
        if (name) where.name = name

        const skip = (pageQuery - 1) * takeQuery

        const data = await this.repository.find({
            where,
            take: takeQuery,
            skip,
        })

        const count = await this.repository.count({ where })

        return new Pagination(data.map((author) => this.toDomain(author)), count, pageQuery, takeQuery)

    }

    async findAuthorById(id: string): Promise<AuthorsDE> {
        const author = await this.repository.findOneByOrFail({ id })
        return this.toDomain(author)
    }

    async updateAuthor(): Promise<void> {

    }

    private toDomain(author: AuthorsOrmEntity): AuthorsDE {
        return new AuthorsDE(
            author.id,
            author.name,
            author.lastname,
            author.birthdate,
            author.biography ?? null,
            author.countryOfBirth,
            author.literaryGenre ?? null,
            author.isActive,
            author.createdAt,
            author.updatedAt,
            author.books?.map((book) => book.id) ?? [],
        )
    }
}
