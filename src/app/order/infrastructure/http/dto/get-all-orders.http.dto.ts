// src/app/order/presentation/dtos/get-all-orders-http.dto.ts
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationHttpDto } from 'src/app/common/http/dto/paginaton.http-dto';

export class GetAllOrdersHttpDto extends PaginationHttpDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  userId?: number;
}
