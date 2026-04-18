import Injectable from "src/app/conmon/decorators/injectable";
import { CategoryRepository } from "src/app/categories/domain/repositories/category.reposiroty";
import { CategoryDE } from "src/app/categories/domain/enitities/category.entity";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";

@Injectable()
export class FindCategoryByIdUseCase {
    constructor(private readonly repository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryDE> {
        const category = await this.repository.findById(id)
        if (!category) throw new CustomError(ErrorCode.CATEGORY_NOT_FOUND, 'Category not found')
        return category
    }
}
