import { InjectRepository } from '@nestjs/typeorm';
import { CategoryOrmEntity } from '../persistence/entities/category.orm-entity';
import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoryDE } from '../../domain/enitities/category.domain-entity';
import { Pagination } from 'src/app/conmon/pagination/pagination';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { CategoriesMapper } from '../mapper/categories.mapper';
import { UpdateCategoryDto } from '../../application/use-cases/update-category/update-category.dto';
import { HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from '../../application/dto/create-category.dto';
import { GetAllCategoriesDto } from '../../application/dto/find-all-categories.dto';
import { VerifyCategoryExistsDto } from '../../application/use-cases/verify-category-exists/verify-category-exists.dto';

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryOrmEntity)
    private readonly repository: Repository<CategoryOrmEntity>,
  ) {}

  async getCategoryById(idCategory: number): Promise<CategoryDE | null> {
    const category = await this.repository.findOne({
      where: { id: idCategory },
    });

    return category !== null ? CategoriesMapper.toDomain(category) : null;
  }

  async verifyCategoryExists({ name }: VerifyCategoryExistsDto): Promise<boolean> {
    return this.repository.exists({ where: { name } });
  }

  async getAllCategories(filters: GetAllCategoriesDto): Promise<Pagination<CategoryDE[]>> {
    const { isActive, name, pageQuery = 1, takeQuery = 200 } = filters;

    const where: FindOptionsWhere<CategoryOrmEntity> = {};

    if (name) where.name = name;
    if (typeof isActive === 'boolean') where.isActive = isActive;

    const skip = (pageQuery - 1) * takeQuery;

    const data = await this.repository.find({ where, take: takeQuery, skip });
    const count = await this.repository.count({ where });

    return new Pagination(
      data.map((entity) => CategoriesMapper.toDomain(entity)),
      count,
      pageQuery,
      takeQuery,
    );
  }

  async createCategory(data: CreateCategoryDto): Promise<CategoryDE> {
    const category = await this.repository.save(data);
    return CategoriesMapper.toDomain(category);
  }

  async updateCategory(input: UpdateCategoryDto): Promise<CategoryDE> {
    await this.repository.update(input.id, { ...input });

    const category = await this.repository.findOneBy({ id: input.id });

    if (!category)
      throw new CustomError(
        ErrorCode.update_record_failed,
        'Error attempting to update the register',
        HttpStatus.BAD_REQUEST,
        CategoryRepositoryImpl.name,
      );

    return CategoriesMapper.toDomain(category);
  }
}
