import { CategoryDE } from "src/app/categories/domain/enitities/category.entity";
import { CategoryRepository } from "src/app/categories/domain/repositories/category.reposiroty";
import { FindAllCategoriesFiltersDto } from "../../dto/find-all-categories.dto";
import Injectable from "src/app/conmon/decorators/injectable";
import { Pagination } from "src/app/conmon/pagination/pagination";

@Injectable()
export class FindAllCategoriesFiltersUseCase {
    constructor(private readonly repository: CategoryRepository) { }

    async execute(filters: FindAllCategoriesFiltersDto): Promise<Pagination<CategoryDE[]>> {
        return this.repository.findAll(filters);
    }
}
