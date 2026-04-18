import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FindAllCategoriesFiltersHttpDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    isActive?: boolean

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageQuery?: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    takeQuery?: number
}
