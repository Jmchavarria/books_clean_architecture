import { CreateUserHttpDto } from './create-user.http-dto';

export class RegisterHttpDto extends CreateUserHttpDto {
  confirmPassword: string;
}
