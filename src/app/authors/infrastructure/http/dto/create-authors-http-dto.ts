
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class CreateAuthorHttpDto {
    @IsString()
    name: string

    @IsString()
    lastname: string

    @Type(() => Date)
    @IsDate()
    birthdate: Date

    @IsOptional()
    @IsString()
    biography?: string | null

    @IsString()
    countryOfBirth: string

    @IsOptional()
    @IsString()
    literaryGenre?: string | null

    @Type(() => Boolean)
    @IsBoolean()
    isActive: boolean
}
