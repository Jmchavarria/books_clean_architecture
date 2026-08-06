import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { CategoryDE } from '../enitities/category.domain-entity';
import type { GetAllCategoriesDto } from '../../application/dto/find-all-categories.dto';
import type {
  CreateCategoryProps,
  UpdateCategoryProps,
  VerifyCategoryExistsProps,
} from '../enitities/categories.props';

export abstract class CategoryRepository {
  abstract create(data: CreateCategoryProps): Promise<CategoryDE>;
  abstract getById(id: number): Promise<CategoryDE | null>;
  abstract getAll(filters: GetAllCategoriesDto): Promise<Pagination<CategoryDE[]>>;
  abstract update(input: UpdateCategoryProps): Promise<CategoryDE | null>;
  abstract verifyExists(input: VerifyCategoryExistsProps): Promise<boolean>;
}
