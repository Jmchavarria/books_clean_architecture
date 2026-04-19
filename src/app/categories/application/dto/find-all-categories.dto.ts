import { PaginationDto } from "src/app/conmon/pagination-interface-dto/pagination.dto"

export interface GetAllCategoriesDto extends PaginationDto {
    name?: string
    isActive?: boolean
}