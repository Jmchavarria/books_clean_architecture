import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBookHttpDto {
  @IsString()
  title: string;

  @IsUUID()
  authorId: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;

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
