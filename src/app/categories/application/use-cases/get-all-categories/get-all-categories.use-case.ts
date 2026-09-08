import { CategoryDE } from 'src/app/categories/domain/enitities/category.domain-entity';
import { CategoryRepository } from 'src/app/categories/domain/repositories/category.reposiroty';
import { GetAllCategoriesDto } from '../../dto/find-all-categories.dto';
import Injectable from 'src/app/common/decorators/injectable';
import { Pagination } from 'src/app/common/pagination/pagination';

@Injectable()
export class GetAllCategoriesUseCase {
  constructor(private readonly repository: CategoryRepository) {}

  async execute(input: GetAllCategoriesDto): Promise<Pagination<CategoryDE[]>> {
    return this.repository.getAll(input);
  }
}
