import type { Pagination } from 'src/app/conmon/pagination/pagination';
import type { CategoryDE } from '../enitities/category.domain-entity';
import type { UpdateCategoryDto } from '../../application/use-cases/update-category/update-category.dto';
import type { CreateCategoryDto } from '../../application/dto/create-category.dto';
import type { GetAllCategoriesDto } from '../../application/dto/find-all-categories.dto';
import type { VerifyCategoryExistsDto } from '../../application/use-cases/verify-category-exists/verify-category-exists.dto';

export abstract class CategoryRepository {
  abstract createCategory(data: CreateCategoryDto): Promise<CategoryDE>;
  abstract getCategoryById(id: number): Promise<CategoryDE | null>;
  abstract getAllCategories(filters: GetAllCategoriesDto): Promise<Pagination<CategoryDE[]>>;
  abstract updateCategory(input: UpdateCategoryDto): Promise<CategoryDE>;
  abstract verifyCategoryExists(input: VerifyCategoryExistsDto): Promise<boolean>;
}
