import Injectable from 'src/app/conmon/decorators/injectable';
import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { CategoryDE } from 'src/app/categories/domain/enitities/category.domain-entity';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(id: number): Promise<CategoryDE> {
    const category = await this.repository.getById(id);
    if (!category)
      throw new CustomError({
        code: ErrorCode.register_not_found,
        message: 'Category not found',
        instanceName: GetCategoryByIdUseCase.name,
      });
    return category;
  }
}
