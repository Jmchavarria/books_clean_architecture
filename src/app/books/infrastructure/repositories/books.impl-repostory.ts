import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import Injectable from 'src/app/conmon/decorators/injectable';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/app/conmon/pagination/pagination';
import { BookOrmEntity } from '../persistence/entities/book.orm-entity';
import { BookMapper } from '../mappers/book.mapper';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { GetAllBooksDto } from '../../application/use-cases/get-all-book-use-case/ge-all-book-filters.dto';
import { CreateBookDto } from '../../application/use-cases/create-book-use-case/create-book.dto';
import { UpdateBookDto } from '../../application/dto/update-book.dto';
import { VerifyBookExistsDto } from '../../application/use-cases/verify-book-exists/verify-book-exists.dto';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(BookOrmEntity)
    private readonly repository: Repository<BookOrmEntity>,
  ) {}

  async createBook(book: CreateBookDto): Promise<BooksDE> {
    const saved = await this.repository.save(book);
    return BookMapper.toDomain(saved);
  }

  async verifyBookExists({
    title,
    authorId,
    publishedYear,
  }: VerifyBookExistsDto): Promise<boolean> {
    return this.repository.exists({ where: { title, authorId, publishedYear } });
  }

  async getAllBooks(input: GetAllBooksDto): Promise<Pagination<BooksDE[]>> {
    const { isActive, publishedYear, title, pageQuery = 1, takeQuery = 10 } = input;

    const where: FindOptionsWhere<BookOrmEntity> = Object.fromEntries(
      Object.entries({ title, isActive, publishedYear }).filter(([, value]) => value !== undefined),
    );

    const skip = (pageQuery - 1) * takeQuery;

    const data = await this.repository.find({ where, take: takeQuery, skip });
    const count = await this.repository.count({ where });

    return new Pagination(
      data.map((entity) => BookMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

  async getBookById(id: number): Promise<BooksDE | null> {
    const book = await this.repository.findOneBy({ id });
    return book !== null ? BookMapper.toDomain(book) : null;
  }

  async updateBook(input: UpdateBookDto): Promise<BooksDE> {
    await this.repository.update(input.id, { ...input });

    const book = await this.repository.findOneBy({ id: input.id });

    if (!book)
      throw new CustomError(
        ErrorCode.update_record_failed,
        'Error attempting to update the register',
        HttpStatus.BAD_REQUEST,
        BookRepositoryImpl.name,
      );

    return BookMapper.toDomain(book);
  }
}
