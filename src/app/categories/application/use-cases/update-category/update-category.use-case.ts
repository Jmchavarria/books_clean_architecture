import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { GetCategoryByIdUseCase } from '../get-category-by-id/get-category-by-id.use-case';
import { UpdateCategoryDto } from './update-category.dto';
import { CategoryDE } from 'src/app/categories/domain/enitities/category.domain-entity';
import { HttpStatus } from '@nestjs/common';
import Injectable from 'src/app/common/decorators/injectable';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
  ) {}

  async execute(input: UpdateCategoryDto): Promise<CategoryDE> {
    await this.getCategoryByIdUseCase.execute(input.id);

    const updateCategory = await this.repository.update(input);

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
