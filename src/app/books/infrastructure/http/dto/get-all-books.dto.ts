import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationHttpDto } from 'src/app/conmon/http/dto/paginaton.http-dto';

export class GetAllBooksHttpDto extends PaginationHttpDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  title?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  publishedYear?: number;

  @IsString()
  @IsOptional()
  search?: string;
}
