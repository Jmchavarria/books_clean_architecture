import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationHttpDto } from 'src/app/conmon/http/dto/paginaton.http-dto';
import { UserStatusEnum } from 'src/app/users/domain/enums/user-status.enum';

export class GetAllUsersHttpDto extends PaginationHttpDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsEnum(UserStatusEnum)
  @IsOptional()
  status?: UserStatusEnum;
}
