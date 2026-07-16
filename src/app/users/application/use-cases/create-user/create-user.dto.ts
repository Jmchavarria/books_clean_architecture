import type { UserRoleEnum } from 'src/app/users/domain/enums/user-role.enum';
import type { UserStatus } from 'src/app/users/domain/enums/user-status.enum';

export interface CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatus;
}
