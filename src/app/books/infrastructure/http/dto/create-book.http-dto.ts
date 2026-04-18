import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBookHttpDto {
  @IsString()
  title: string;

  @IsUUID()
  authorId: string;

  @IsUUID()
  @IsOptional()
  categoryId?: string 

  @IsOptional()
  @IsString()
  description?: string 

  @Type(() => Number)
  @IsNumber()
  pages: number;

  @Type(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @Type(() => Number)
  @IsNumber()
  publishedYear: number;
}
