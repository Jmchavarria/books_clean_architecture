import { CategoryDE } from "src/app/categories/domain/enitities/category.domain-entity";
import { CategoryRepository } from "src/app/categories/domain/repositories/category.reposiroty";
import { GetAllCategoriesDto } from "../../dto/find-all-categories.dto";
import Injectable from "src/app/conmon/decorators/injectable";
import { Pagination } from "src/app/conmon/pagination/pagination";

@Injectable()
export class GetAllCategoriesUseCase {
    constructor(private readonly repository: CategoryRepository) { }

    async execute(input: GetAllCategoriesDto): Promise<Pagination<CategoryDE[]>> {
        return this.repository.getAllCategories(input);
    }
}