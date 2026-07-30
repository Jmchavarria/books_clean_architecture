import { IsString, MinLength } from 'class-validator';
import { CreateUserHttpDto } from 'src/app/users/infrastructure/http/dto/create-user.http-dto';

export class RegisterHttpDto extends CreateUserHttpDto {
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
