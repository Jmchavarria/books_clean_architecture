import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Pagination } from "src/app/conmon/pagination/pagination";
import { PaginationHttpDto } from "src/app/conmon/http/dto/paginaton.http-dto";

export class GetAllBooksHttpDto extends PaginationHttpDto {
  
    @IsString()
    @IsOptional()
    @Type(() => String)
    title?: string

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    isActive?: boolean

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    publishedYear?: number
}
