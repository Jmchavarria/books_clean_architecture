import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusTypeEnum } from 'src/app/conmon/enums/status.type.enum';
import { PaginationHttpDto } from 'src/app/conmon/http/dto/paginaton.http-dto';

export class GetAllUsersHttpDto extends PaginationHttpDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsEnum(StatusTypeEnum)
  @IsOptional()
  status?: StatusTypeEnum;
}
