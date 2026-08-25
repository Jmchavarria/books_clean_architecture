import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';
import type { UserStatusEnum } from 'src/app/users/domain/enums/user-status.enum';

export interface GetAllUsersDto extends PaginationProps {
  status?: UserStatusEnum;
  search?: string;
}
