import { InjectRepository } from "@nestjs/typeorm";
import { CategoryOrmEntity } from "../persistence/entities/category.orm-entity";
import { CategoryRepository, FindAllCategoriesFilters, SaveCategoryParams } from "src/app/categories/domain/repositories/category.reposiroty";
import { FindOptionsWhere, Repository } from "typeorm";
import { CategoryDE } from "../../domain/enitities/category.domain-entity";
import { Pagination } from "src/app/conmon/pagination/pagination";
import Injectable from "src/app/conmon/decorators/injectable";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";
import { CategoriesMapper } from "../mapper/categories.mapper";

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(

        @InjectRepository(CategoryOrmEntity)
        private readonly repository: Repository<CategoryOrmEntity>,
    ) { }

    async getCategoryById(idCategory: string): Promise<CategoryDE | null> {
        const category = await this.repository.findOne({
            where: { id: idCategory }
        })

        return category !== null ? CategoriesMapper.toDomain(category) : null
    }

    async getAllCategories(filters: FindAllCategoriesFilters): Promise<Pagination<CategoryDE[]>> {
        const { isActive, name, pageQuery = 1, takeQuery = 200 } = filters

        const where: FindOptionsWhere<CategoryOrmEntity> = {}

        if (name) where.name = name
        if (typeof isActive === "boolean") where.isActive = isActive

        const skip = (pageQuery - 1) * takeQuery

        const data = await this.repository.find({
            where,
            take: takeQuery,
            skip
        })

        const count = await this.repository.count({ where })

        return new Pagination(data.map(CategoriesMapper.toDomain), count, pageQuery, takeQuery)
    }

    async createCategory(data: SaveCategoryParams): Promise<CategoryDE> {
        try {
            const category = await this.repository.save(data)
            return CategoriesMapper.toDomain(category)
        } catch (error) {

            throw new CustomError(
                ErrorCode.create_record_failed,
                "Failed to create category",
                undefined,
                error,
                CategoryRepositoryImpl.name,
            );
        }
    }



    async updateCategory(id: string, data: Partial<SaveCategoryParams>): Promise<CategoryDE | null> {
        try {
            const categoryFound = await this.repository.findOneBy({ id });


            const updated = await this.repository.save({
                ...categoryFound,
                ...data
            })

            return categoryFound !== null ? CategoriesMapper.toDomain(updated) : null

        } catch (error) {

            throw new CustomError(
                ErrorCode.update_record_failed,
                "Failed to update record",
                undefined,
                error,
            );
        }
    }

}
