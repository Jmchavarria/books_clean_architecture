import { PaginationDto } from "src/app/conmon/pagination-interface-dto/pagination.dto"

export interface GetAllBooksDto extends PaginationDto {
    title?: string;
    isActive?: boolean;
    publishedYear?: number;
}