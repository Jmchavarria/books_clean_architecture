import { InjectRepository } from "@nestjs/typeorm";
import { CategoryOrmEntity } from "../persistence/entities/category.orm-entity";
import { CategoryRepository, FindAllCategoriesFilters, SaveCategoryParams } from "src/app/categories/domain/repositories/category.reposiroty";
import { FindOptionsWhere, Repository } from "typeorm";
import { CategoryDE } from "../../domain/enitities/category.entity";
import { Pagination } from "src/app/conmon/pagination/pagination";
import Injectable from "src/app/conmon/decorators/injectable";
import { CustomError } from "src/app/conmon/errors/custom.error";
import { ErrorCode } from "src/app/conmon/errors/error-code.enum";

@Injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
    constructor(

        @InjectRepository(CategoryOrmEntity)
        private readonly repository: Repository<CategoryOrmEntity>,
    ) { }


    async delete(id: string): Promise<{ success: boolean, message: string, data: {} }> {

        await this.findById(id)
        const result = await this.repository.delete(id)
        return { success: true, message: 'Success', data: result }

    }

    async findById(idCategory: string): Promise<CategoryDE> {
        const result = await this.repository.findOne({
            where: { id: idCategory }
        })

        if (!result) throw new CustomError(ErrorCode.CATEGORY_NOT_FOUND, 'Category not found')

        return new CategoryDE(
            result.id,
            result.name,
            result.isActive,
            result.createdAt,
            result.updatedAt
        )
    }

    async findAll(filters: FindAllCategoriesFilters): Promise<Pagination<CategoryDE[]>> {
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

        const total = await this.repository.count({ where })

        return new Pagination(data.map((category) => this.toDomain(category)), total, pageQuery, takeQuery)



    }

    async save(data: SaveCategoryParams): Promise<CategoryDE> {
        const category = await this.repository.save(data)
        return this.toDomain(category)
    }



    async update(id: string, data: Partial<SaveCategoryParams>): Promise<CategoryDE> {

        const existing = await this.repository.findOneBy({ id });

        if (!existing) {
            throw new CustomError(ErrorCode.CATEGORY_NOT_FOUND, "Category not found");
        }

        const updated = await this.repository.save({
            ...existing,
            ...data
        })
        return this.toDomain(updated)

    }

    private toDomain(category: CategoryOrmEntity): CategoryDE {
        return new CategoryDE(
            category.id,
            category.name,
            category.isActive,
            category.createdAt,
            category.updatedAt,
        )
    }

}
