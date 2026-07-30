import type { UserRoleEnum } from 'src/app/users/domain/enums/user-role.enum';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
