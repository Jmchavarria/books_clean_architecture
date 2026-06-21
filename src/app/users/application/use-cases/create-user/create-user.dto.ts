import type {
  UserRoleEnum,
  UserStatus,
} from 'src/app/users/infrastructure/persistence/entities/users.orm-entity';

export interface CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatus;
}
