import { Pagination } from "src/app/conmon/pagination/pagination";
import { CategoryDE } from "../enitities/category.domain-entity";

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
    abstract createCategory(data: SaveCategoryParams): Promise<CategoryDE>
    abstract getCategoryById(id: number): Promise<CategoryDE | null>
    abstract getAllCategories(filters: FindAllCategoriesFilters): Promise<Pagination<CategoryDE[]>>
    abstract updateCategory(id: number, data: Partial<SaveCategoryParams>): Promise<CategoryDE | null >
}
