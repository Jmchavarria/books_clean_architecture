import { AuthorsOrmEntity } from '../persistence/entities/authors.orm-entity';
import {
  AuthorsRepository,
  FindAllAuthorsParams,
} from '../../domain/repository/authors.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsDE } from '../../domain/entity/authors.domain-entity';
import { Pagination } from 'src/app/conmon/pagination/pagination';
import Injectable from 'src/app/conmon/decorators/injectable';
import { AuthorsMapper } from '../mapper/authors.mapper';
import { UpdateAuthorDto } from '../../application/use-cases/update-author/update-author.dto';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { CreateAuthorDto } from '../../application/use-cases/create-author/create-author.dto';

@Injectable()
export class AuthorsRepositoryImpl implements AuthorsRepository {
  constructor(
    @InjectRepository(AuthorsOrmEntity)
    private readonly repository: Repository<AuthorsOrmEntity>,
  ) {}

  async createAuthor(input: CreateAuthorDto): Promise<AuthorsDE> {
    const author = await this.repository.save(input);
    return AuthorsMapper.toDomain(author);
  }

  async getAllAuthors({
    isActive,
    literaryGenre,
    name,
    pageQuery = 1,
    takeQuery = 10,
  }: FindAllAuthorsParams): Promise<Pagination<AuthorsDE[]>> {
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
    });

    const count = await this.repository.count({ where });

    return new Pagination(
      data.map((entity) => AuthorsMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

  async getAuthorById(id: number): Promise<AuthorsDE | null> {
    const author = await this.repository.findOneBy({ id });
    return author !== null ? AuthorsMapper.toDomain(author) : null;
  }

  async updateAuthor(input: UpdateAuthorDto): Promise<AuthorsDE> {
    await this.repository.update(input.id, { birthdate: new Date(), ...input });

    const author = await this.repository.findOneBy({ id: input.id });

    if (!author)
      throw new CustomError(
        ErrorCode.update_record_failed,
        'Error attempting to update the register',
        HttpStatus.BAD_REQUEST,
        AuthorsRepository.name,
      );

    return AuthorsMapper.toDomain(author);
  }
}
