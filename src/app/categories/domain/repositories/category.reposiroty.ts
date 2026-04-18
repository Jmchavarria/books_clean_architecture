import { Pagination } from "src/app/conmon/pagination/pagination";
import { CategoryDE } from "../enitities/category.entity";

export interface SaveCategoryParams {
    name: string;
    isActive: boolean;
}

export interface FindAllCategoriesFilters {
    pageQuery?: number;
    takeQuery?: number;
    name?: string;
    isActive?: boolean;
}

export abstract class CategoryRepository {
    abstract save(data: SaveCategoryParams): Promise<CategoryDE>
    abstract findById(id: string): Promise<CategoryDE>
    abstract findAll(filters: FindAllCategoriesFilters): Promise<Pagination<CategoryDE[]>>
    abstract update(id: string, data: Partial<SaveCategoryParams>): Promise<CategoryDE>
    abstract delete(id: string): Promise<{ success: boolean, message: string, data: {} }>
}
