import { AuthorsOrmEntity } from "../persistence/entities/authors.orm-entity";
import { AuthorsRepository, CreateAuthorParams, FindAllAuthorsParams } from "../../domain/repository/authors.repository";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorsDE } from "../../domain/entity/authors.domain-entity";
import { Pagination } from "src/app/conmon/pagination/pagination";
import Injectable from "src/app/conmon/decorators/injectable";
import { AuthorsMapper } from "../mapper/authors.mapper";

@Injectable()
export class AuthorsRepositoryImpl implements AuthorsRepository {
    constructor(
        @InjectRepository(AuthorsOrmEntity)
        private readonly repository: Repository<AuthorsOrmEntity>) { }

    async createAuthor(input: CreateAuthorParams): Promise<AuthorsDE> {
        const author = await this.repository.save(input)
        return AuthorsMapper.toDomain(author)
    }

    async finAllAuthors({ isActive, literaryGenre, name, pageQuery = 1, takeQuery = 10 }: FindAllAuthorsParams): Promise<Pagination<AuthorsDE[]>> {

        const where: FindOptionsWhere<AuthorsOrmEntity> = Object.fromEntries(
            Object.entries({
                isActive,
                literaryGenre,
                name,
            }).filter(([, value]) => value !== undefined)
        );

        const skip = (pageQuery - 1) * takeQuery;

        const data = await this.repository.find({
            where, take: takeQuery, skip,
        })

        const count = await this.repository.count({ where })

        return new Pagination(
            data.map(AuthorsMapper.toDomain),
            count,
            pageQuery,
            takeQuery,
        );
    }

    async findAuthorById(id: number): Promise<AuthorsDE> {
        const author = await this.repository.findOneByOrFail({ id })
        return AuthorsMapper.toDomain(author)
    }

    async updateAuthor(): Promise<void> {

    }

}