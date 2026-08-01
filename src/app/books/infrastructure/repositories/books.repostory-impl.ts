import { BooksDE } from 'src/app/books/domain/entities/book.domain-entity';
import { BookRepository } from 'src/app/books/domain/repositories/book.repository';
import { Repository } from 'typeorm';
import Injectable from 'src/app/conmon/decorators/injectable';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/app/conmon/pagination/pagination';
import { BookMapper } from '../mappers/book.mapper';
import { GetAllBooksDto } from '../../application/use-cases/get-all-book-use-case/ge-all-book-filters.dto';
import { CreateBookDto } from '../../application/use-cases/create-book-use-case/create-book.dto';
import { UpdateBookDto } from '../../application/dto/update-book.dto';
import { VerifyBookExistsDto } from '../../application/use-cases/verify-book-exists/verify-book-exists.dto';
import { BooksOrmEntity } from '../persistence/entities/books.orm-entity';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(BooksOrmEntity)
    private readonly repository: Repository<BooksOrmEntity>,
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
    const { isActive, publishedYear, title, search, pageQuery = 1, takeQuery = 10 } = input;

    const query = this.repository
      .createQueryBuilder('books')
      .innerJoinAndSelect('books.category', 'category')
      .innerJoinAndSelect('books.author', 'author');

    for (const [field, value] of Object.entries({ isActive, publishedYear, title })) {
      if (value !== undefined) {
        query.andWhere(`books.${field} = :${field}`, { [field]: value });
      }
    }
    const skip = (pageQuery - 1) * takeQuery;

    if (search?.trim()) {
      query.andWhere(
        `(
      books.title LIKE :search
      OR books.description LIKE :search
      OR author.name LIKE :search
      OR category.name LIKE :search
    )`,
        { search: `%${search}%` },
      );
    }

    const data = await query.skip(skip).take(takeQuery).getMany();
    const count = await query.getCount();

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

  async updateBook(input: UpdateBookDto): Promise<BooksDE | null> {
    await this.repository.update(input.id, { ...input });

    const book = await this.repository.findOneBy({ id: input.id });

    return book !== null ? BookMapper.toDomain(book) : null;
  }
}
