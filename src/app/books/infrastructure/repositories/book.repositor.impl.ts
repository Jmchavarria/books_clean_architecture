import { BooksDE } from "src/app/books/domain/entities/book.entity";
import { BookRepository, FindBooksFilters, SaveBookParams, UpdateBookParams } from "src/app/books/domain/repositories/book.repository";
import { FindOptionsWhere, Repository } from "typeorm";
import Injectable from "src/app/conmon/decorators/injectable";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "src/app/conmon/pagination/pagination";
import { BookOrmEntity } from "../persistence/entities/book.orm-entity";
import { BookMapper } from "../mappers/book.mapper";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";

@Injectable()
export class BookRepositoryImpl implements BookRepository {

    constructor(
        @InjectRepository(BookOrmEntity)
        private readonly repository: Repository<BookOrmEntity>
    ) { }

    async save(book: SaveBookParams): Promise<BooksDE> {
    
        const saved = await this.repository.save(book);
        return BookMapper.toDomain(saved);
    }

    async getAll(filters: FindBooksFilters): Promise<Pagination<BooksDE[]>> {

        const { isActive, publishedYear, title, pageQuery = 1, takeQuery = 10 } = filters

        let where: FindOptionsWhere<BookOrmEntity> = {}

        if (title) where.title = title
        if (typeof isActive === "boolean") where.isActive = isActive
        if (publishedYear) where.publishedYear = publishedYear

        const skip = (pageQuery - 1) * takeQuery

        const data = await this.repository.find({
            where,
            take: takeQuery,
            skip,
        })

        const count = await this.repository.count({ where })

        return new Pagination(data.map(BookMapper.toDomain), count, pageQuery, takeQuery)
    }

    async findById(id: string): Promise<BooksDE> {
        const book = await this.repository.findOneBy({ id });

        if (!book) {
            throw new CustomError(ErrorCode.BOOK_NOT_FOUND, "Book not found");
        }

        return BookMapper.toDomain(book)
    }

    async update(input: UpdateBookParams): Promise<BooksDE> {
        const existing = await this.repository.findOneBy({ id: input.id });

        if (!existing) {
            throw new CustomError(ErrorCode.BOOK_NOT_FOUND, "Book not found");
        }

        const saved = await this.repository.save({
            ...existing,
            ...input
        })
        return BookMapper.toDomain(saved)
    }

    async delete(id: string): Promise<void> {
        const book = await this.repository.findOneBy({ id });

        if (!book) {
            throw new CustomError(ErrorCode.BOOK_NOT_FOUND, "Book not found");
        }

        await this.repository.delete(id);
    }
}
