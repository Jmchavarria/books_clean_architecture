import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetAllCategoriesHttpDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: TransformFnParams): boolean | undefined => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageQuery?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  takeQuery?: number;
}
