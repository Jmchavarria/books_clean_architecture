import { Type } from "class-transformer";
import { IsBoolean, IsString } from "class-validator";

export class CreateCategoryHttpDto {
    @IsString()
    name: string

    @Type(() => Boolean)
    @IsBoolean()
    isActive: boolean
}