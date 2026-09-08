import type { PaginationProps } from 'src/app/common/domain/pagination.props';
import type { StatusTypeEnum } from 'src/app/common/enums/status.type.enum';
import type { UserRoleEnum } from '../enums/user-role.enum';

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
