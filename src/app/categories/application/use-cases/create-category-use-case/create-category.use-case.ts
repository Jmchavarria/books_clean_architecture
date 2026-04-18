import { CategoryRepository } from "src/app/categories/domain/repositories/category.reposiroty";
import { CategoryDE } from "src/app/categories/domain/enitities/category.entity";
import { CreateCategoryDto } from "../../dto/create-category.dto";
import Injectable from "src/app/conmon/decorators/injectable";

@Injectable()
export class CreateCategoryUseCase {
    constructor(private readonly repository: CategoryRepository) { }

    async execute(data: CreateCategoryDto): Promise<CategoryDE> {
        return this.repository.save(data);
    }
}
