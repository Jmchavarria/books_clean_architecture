import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { CategoryDE } from '../enitities/category.domain-entity';
import type {
  CreateCategoryProps,
  GetAllCategoriesProps,
  UpdateCategoryProps,
  VerifyCategoryExistsProps,
} from '../enitities/categories.props';

export abstract class CategoryRepository {
  abstract create(input: CreateCategoryProps): Promise<CategoryDE>;
  abstract getById(id: number): Promise<CategoryDE | null>;
  abstract getAll(input: GetAllCategoriesProps): Promise<Pagination<CategoryDE[]>>;
  abstract update(input: UpdateCategoryProps): Promise<CategoryDE | null>;
  abstract verifyExists(input: VerifyCategoryExistsProps): Promise<boolean>;
}
