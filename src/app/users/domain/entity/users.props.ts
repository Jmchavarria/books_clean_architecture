import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';
import type { UserRoleEnum } from '../enums/user-role.enum';
import type { StatusTypeEnum } from 'src/app/conmon/enums/status.type.enum';

export interface GetAllUsersProps extends PaginationProps {
  status?: StatusTypeEnum;
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
