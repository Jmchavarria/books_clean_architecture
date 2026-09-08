import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { CategoryDE } from 'src/app/categories/domain/enitities/category.domain-entity';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { VerifyCategoryExistsUseCase } from '../verify-category-exists/verify-category-exists.use-case';
import { HttpStatus } from '@nestjs/common';
import { CustomError } from 'src/app/common/errors/custom.error';
import { ErrorCode } from 'src/app/common/errors/error-code.enum';
import { CustomSlugify } from 'src/app/common/utils/custom.slugify.util';
import Injectable from 'src/app/common/decorators/injectable';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private readonly repository: CategoryRepository,
    private readonly verifyCategoryExistsUseCase: VerifyCategoryExistsUseCase,
  ) {}

  async execute(input: CreateCategoryDto): Promise<CategoryDE> {
    const verifyCategoryExists = await this.verifyCategoryExistsUseCase.execute(input);
    const generateSlug = CustomSlugify(input.name);

    if (verifyCategoryExists)
      throw new CustomError({
        code: ErrorCode.category_already_exists,
        message: 'The category already exists',
        statusCode: HttpStatus.BAD_REQUEST,
        instanceName: CreateCategoryUseCase.name,
      });

    return this.repository.create({
      ...input,
      slug: generateSlug,
    });
  }
}
