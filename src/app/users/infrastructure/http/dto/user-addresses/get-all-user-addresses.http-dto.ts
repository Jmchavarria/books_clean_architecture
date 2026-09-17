import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { PaginationHttpDto } from 'src/app/common/http/dto/paginaton.http-dto';

export class GetAllUserAddressesHttpDto extends PaginationHttpDto {
  @Type(() => Number)
  @IsOptional()
  userId: number;

  @IsOptional()
  @IsString()
  @IsOptional()
  search: string;
}
