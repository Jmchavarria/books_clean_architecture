import { BooksDE } from "src/app/books/domain/entities/book.domain-entity";
import { BookRepository, SaveBookParams, UpdateBookParams } from "src/app/books/domain/repositories/book.repository";
import { FindOptionsWhere, Repository } from "typeorm";
import Injectable from "src/app/conmon/decorators/injectable";
import { InjectRepository } from "@nestjs/typeorm";
import { Pagination } from "src/app/conmon/pagination/pagination";
import { BookOrmEntity } from "../persistence/entities/book.orm-entity";
import { BookMapper } from "../mappers/book.mapper";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";
import { GetAllBooksDto } from "../../application/use-cases/get-all-book-use-case/ge-all-book-filters.dto";

@Injectable()
export class BookRepositoryImpl implements BookRepository {

    constructor(
        @InjectRepository(BookOrmEntity)
        private readonly repository: Repository<BookOrmEntity>
    ) { }

    async createBook(book: SaveBookParams): Promise<BooksDE> {

        const saved = await this.repository.save(book);
        return BookMapper.toDomain(saved);
    }

    async getAllBooks(input: GetAllBooksDto): Promise<Pagination<BooksDE[]>> {

        const { isActive, publishedYear, title, pageQuery = 1, takeQuery = 10 } = input

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

    async getBookById(id: string): Promise<BooksDE | null> {

        try {

            const book = await this.repository.findOneBy({ id });

            return book !== null ? BookMapper.toDomain(book) : null

        } catch (error) {
            throw new CustomError(
                ErrorCode.update_record_failed,
                "Failed to update book",
                undefined,
                error,
                BookRepositoryImpl.name,
            );
        }
    }

    async updateBook(input: UpdateBookParams): Promise<BooksDE> {
        try {
            const existing = await this.repository.findOneBy({ id: input.id });

            if (!existing) {
                throw new CustomError(ErrorCode.register_not_found, "Book not found");
            }

            const saved = await this.repository.save({
                ...existing,
                ...input
            })

            return BookMapper.toDomain(saved)
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(
                ErrorCode.internal_server_error,
                "Failed to update book",
                undefined,
                error,
                BookRepositoryImpl.name,
            );
        }
    }

    async deleteBook(id: string): Promise<void> {
        try {
            const book = await this.repository.findOneBy({ id });

            if (!book) {
                throw new CustomError(ErrorCode.register_not_found, "Book not found");
            }

            await this.repository.delete(id);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw new CustomError(
                ErrorCode.internal_server_error,
                "Failed to delete book",
                undefined,
                error,
                BookRepositoryImpl.name,
            );
        }
    }
}
