import { InjectRepository } from '@nestjs/typeorm';
import { CategoryOrmEntity } from '../persistence/entities/category.orm-entity';
import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { Repository } from 'typeorm';
import { CategoryDE } from '../../domain/enitities/category.domain-entity';
import { CategoriesMapper } from '../mapper/categories.mapper';
import { UpdateCategoryDto } from '../../application/use-cases/update-category/update-category.dto';
import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { GetAllCategoriesDto } from '../../application/dto/find-all-categories.dto';
import { VerifyCategoryExistsDto } from '../../application/use-cases/verify-category-exists/verify-category-exists.dto';
import { Pagination } from 'src/app/common/pagination/pagination';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryOrmEntity)
    private readonly repository: Repository<CategoryOrmEntity>,
  ) {}

  async getById(idCategory: number): Promise<CategoryDE | null> {
    const category = await this.repository.findOne({
      where: { id: idCategory },
      relations: {
        books: true,
      },
    });

    return category !== null ? CategoriesMapper.toDomain(category) : null;
  }

  async verifyExists({ name }: VerifyCategoryExistsDto): Promise<boolean> {
    return this.repository.exists({ where: { name }, relations: { books: true } });
  }

  async getAll(filters: GetAllCategoriesDto): Promise<Pagination<CategoryDE[]>> {
    const { isActive, pageQuery = 1, takeQuery = 5, search, name } = filters;

    const query = this.repository
      .createQueryBuilder('categories')
      .leftJoinAndSelect('categories.books', 'books')
      .leftJoinAndSelect('books.author', 'author');

    for (const [field, value] of Object.entries({ isActive, name })) {
      if (value !== undefined) {
        query.andWhere(`categories.${field} = :${field}`, { [field]: value });
      }
    }

    if (search?.trim()) {
      query.andWhere(
        `(
        categories.name ILIKE :search 
   
        )`,
        {
          search: `%${search}%`,
        },
      );
    }

    const skip = (pageQuery - 1) * takeQuery;

    const data = await query
      .orderBy('categories.createdAt', 'DESC')
      .skip(skip)
      .take(takeQuery)
      .getMany();

    const count = await query.getCount();

    return new Pagination(
      data.map((entity) => CategoriesMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

  async create(data: CreateCategoryDto): Promise<CategoryDE> {
    const category = await this.repository.save(data);
    return CategoriesMapper.toDomain(category);
  }

  async update(input: UpdateCategoryDto): Promise<CategoryDE | null> {
    await this.repository.update(input.id, { ...input });

    const category = await this.repository.findOne({
      where: {
        id: input.id,
      },
      relations: { books: true },
    });

    return category !== null ? CategoriesMapper.toDomain(category) : null;
  }
}
