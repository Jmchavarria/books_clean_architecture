import { AuthorsOrmEntity } from '../persistence/entities/authors.orm-entity';
import { AuthorsRepository } from '../../domain/repositories/authors.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsDE } from '../../domain/entities/authors.domain-entity';
import { AuthorsMapper } from '../mapper/authors.mapper';
import { UpdateAuthorDto } from '../../application/use-cases/update-author/update-author.dto';
import { HttpStatus } from '@nestjs/common';
import { GetAllAuthorsDto } from '../../application/use-cases/get-all-authors/get-all-authors.dto';
import { CreateAuthorProps } from '../../domain/entities/authors.props';
import Injectable from 'src/app/common/decorators/injectable';
import { Pagination } from 'src/app/common/pagination/pagination';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class AuthorsRepositoryImpl implements AuthorsRepository {
  constructor(
    @InjectRepository(AuthorsOrmEntity)
    private readonly repository: Repository<AuthorsOrmEntity>,
  ) {}

  async create(input: CreateAuthorProps): Promise<AuthorsDE> {
    const author = await this.repository.save(input);

    return AuthorsMapper.toDomain(author);
  }

  async getAll({
    isActive,
    literaryGenre,
    name,
    pageQuery = 1,
    takeQuery = 5,
  }: GetAllAuthorsDto): Promise<Pagination<AuthorsDE[]>> {
    const where: FindOptionsWhere<AuthorsOrmEntity> = Object.fromEntries(
      Object.entries({
        isActive,
        literaryGenre,
        name,
      }).filter(([, value]) => value !== undefined),
    );

    const skip = (pageQuery - 1) * takeQuery;

    const data = await this.repository.find({
      where,
      take: takeQuery,
      skip,
      relations: {
        books: {
          category: true,
          author: true,
        },
      },
    });

    const count = await this.repository.count({ where });

    return new Pagination(
      data.map((entity) => AuthorsMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

  async getbyId(id: number): Promise<AuthorsDE | null> {
    const author = await this.repository.findOne({ where: { id }, relations: { books: true } });
    return author !== null ? AuthorsMapper.toDomain(author) : null;
  }

  async update(input: UpdateAuthorDto): Promise<AuthorsDE | null> {
    await this.repository.update(input.id, { birthdate: new Date(), ...input });

    const author = await this.repository.findOneBy({ id: input.id });

    if (!author)
      throw new CustomError({
        code: ErrorCode.update_record_failed,
        message: 'Error attempting to update the register',
        statusCode: HttpStatus.BAD_REQUEST,
        instanceName: AuthorsRepository.name,
      });

    return AuthorsMapper.toDomain(author);
  }
}
