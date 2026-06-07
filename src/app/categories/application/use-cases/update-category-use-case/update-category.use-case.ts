import { CategoryRepository } from "src/app/categories/domain/repositories/category.reposiroty";
import { CreateCategoryDto } from "../../dto/create-category.dto";
import { FindCategoryByIdUseCase } from "../find-category-by-id/find-category-by-id.use-case";
import Injectable from "src/app/conmon/decorators/injectable";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";

@Injectable()
export class UpdateCategoryUsCase {
    constructor(private readonly repository: CategoryRepository,
        private readonly findCategoryByIdUseCase: FindCategoryByIdUseCase
    ) { }

    async execute(id: number, data: CreateCategoryDto) {

        const existCategory = await this.findCategoryByIdUseCase.execute(id)

        if (!existCategory.id) {
            throw new CustomError(ErrorCode.record_id_undefined, 'failed to update Category')
        }

        return this.repository.updateCategory(existCategory.id, data)
    }
}
