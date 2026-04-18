import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class FindAllAuthorsHttpDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    isActive?: boolean

    @IsOptional()
    @IsString()
    literaryGenre?: string
}
