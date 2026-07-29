import { CreateUserHttpDto } from 'src/app/users/infrastructure/http/dto/create-user.http-dto';

export class RegisterHttpDto extends CreateUserHttpDto {
  confirmPassword: string;
}
