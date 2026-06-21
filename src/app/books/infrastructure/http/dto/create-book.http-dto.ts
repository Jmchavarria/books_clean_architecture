import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookHttpDto {
  @IsString()
  title: string;

  @IsNumber()
  authorId: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsOptional()
  @IsString()
  description?: string;

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
