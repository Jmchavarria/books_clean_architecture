import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { CategoryDE } from 'src/app/categories/domain/enitities/category.domain-entity';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import Injectable from 'src/app/conmon/decorators/injectable';
import { VerifyCategoryExistsUseCase } from '../verify-category-exists/verify-category-exists.use-case';
import { CustomError } from 'src/app/conmon/errors/custom.error';
import { ErrorCode } from 'src/app/conmon/errors/error-code.enum';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly verifyCategoryExistsUseCase: VerifyCategoryExistsUseCase,
  ) {}

  async execute(input: CreateCategoryDto): Promise<CategoryDE> {
    const verifyCategoryExists = await this.verifyCategoryExistsUseCase.execute(input);

    if (verifyCategoryExists)
      throw new CustomError({
        code: ErrorCode.category_already_exists,
        message: 'The category already exists',
        statusCode: HttpStatus.BAD_REQUEST,
        instanceName: CreateCategoryUseCase.name,
      });

    return this.repository.create(input);
  }
}
