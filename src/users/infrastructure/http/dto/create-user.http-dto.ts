import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum, UserStatus } from '../../persistence/entities/users.orm-entity';

export class CreateUserHttpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;

  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;
}
