import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class GetAllCategoriesHttpDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsOptional()
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
