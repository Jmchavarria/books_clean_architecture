import { CategoryRepository } from "src/app/categories/domain/repositories/category.reposiroty";
import Injectable from "src/app/conmon/decorators/injectable";
import { FindCategoryByIdUseCase } from "../find-category-by-id/find-category-by-id.use-case";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";

@Injectable()
export class DeleteCategoryUseCase {
    constructor(
        private readonly respository: CategoryRepository,
        private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase,
    ) { }

    async execute(id: string) {
        const category = await this.findCategoryByIdUseCase.execute(id);

        if (!category) {
            throw new CustomError(ErrorCode.CATEGORY_NOT_FOUND, "Category not found");
        }

        return this.respository.delete(id);
    }
}
