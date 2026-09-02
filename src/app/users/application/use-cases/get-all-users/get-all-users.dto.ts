import type { PaginationProps } from 'src/app/conmon/domain/pagination.props';
import type { StatusTypeEnum } from 'src/app/conmon/enums/status.type.enum';

export interface GetAllUsersDto extends PaginationProps {
  status?: StatusTypeEnum;
  search?: string;
}
