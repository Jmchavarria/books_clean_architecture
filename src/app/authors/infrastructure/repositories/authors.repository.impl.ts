import { AuthorsOrmEntity } from '../persistence/entities/authors.orm-entity';
import { AuthorsRepository } from '../../domain/repositories/authors.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsDE } from '../../domain/entities/authors.domain-entity';
import { Pagination } from 'src/app/conmon/pagination/pagination';
import Injectable from 'src/app/conmon/decorators/injectable';
import { AuthorsMapper } from '../mapper/authors.mapper';
import { UpdateAuthorDto } from '../../application/use-cases/update-author/update-author.dto';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { CreateAuthorDto } from '../../application/use-cases/create-author/create-author.dto';
import { GetAllAuthorsDto } from '../../application/use-cases/get-all-authors/get-all-authors.dto';

@Injectable()
export class AuthorsRepositoryImpl implements AuthorsRepository {
  constructor(
    @InjectRepository(AuthorsOrmEntity)
    private readonly repository: Repository<AuthorsOrmEntity>,
  ) {}

  async create(input: CreateAuthorDto): Promise<AuthorsDE> {
    const author = await this.repository.save(input);
    return AuthorsMapper.toDomain(author);
  }

  async getAll({
    isActive,
    literaryGenre,
    name,
    pageQuery = 1,
    takeQuery = 10,
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
      relations: { books: true },
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
