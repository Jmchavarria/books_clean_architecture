import type { CreateUserDto } from 'src/app/users/application/use-cases/create-user/create-user.dto';

export interface RegisterDto extends Omit<CreateUserDto, 'role'> {
  confirmPassword: string;
}
