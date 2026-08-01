import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { FindCategoryByIdUseCase } from '../find-category-by-id/find-category-by-id.use-case';
import Injectable from 'src/app/conmon/decorators/injectable';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { UpdateCategoryDto } from './update-category.dto';
import { CategoryDE } from 'src/app/categories/domain/enitities/category.domain-entity';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
  ) {}

  async execute(input: UpdateCategoryDto): Promise<CategoryDE> {
    await this.findCategoryByIdUseCase.execute(input.id);

    const updateCategory = await this.repository.updateCategory(input);

    if (!updateCategory)
      throw new CustomError({
        code: ErrorCode.record_id_undefined,
        message: 'failed to update Category',
        statusCode: HttpStatus.NOT_FOUND,
        instanceName: UpdateCategoryUseCase.name,
      });

    return updateCategory;
  }
}
