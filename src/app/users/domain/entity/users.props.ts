import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';
import type { UserStatusEnum } from '../enums/user-status.enum';
import type { UserRoleEnum } from '../enums/user-role.enum';

export interface GetAllUsersProps extends PaginationProps {
  status?: UserStatusEnum;
  search?: string;
}

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRoleEnum;
  password: string;
}

export type UpdateUserProps = Partial<CreateUserProps> & { id: number };
